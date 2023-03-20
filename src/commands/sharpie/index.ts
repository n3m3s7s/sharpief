import { Command, Flags } from "@oclif/core";

import * as fs from "fs";
import * as sharp from "sharp";

enum Encoders {
  JPEG = "jpeg",
  WEBP = "webp",
  AVIF = "avif",
  PNG = "png",
  GIF = "gif"
}

export default class Sharpie extends Command {
  static description =
    "Convert and resize input image to optimized image output";

  static flags = {
    // add --version flag to show CLI version
    version: Flags.version({ char: "v" }),
    help: Flags.help({ char: "h" }),
    quality: Flags.integer({
      char: "q",
      default: 60,
      description: "Number between 1-100 to set quality of the output image",
    }),
    // flag with a value (-n, --name=VALUE)
    type: Flags.string({
      char: "t",
      default: Encoders.WEBP,
      description: "encoder to use - choose from: jpeg, webp, avif",
    }),
    resize: Flags.string({
      char: "r",
      description: "a JSON object to pass manipulations to Sharp.js 'resize' method",
    }),
    // flag with no value (-f, --force)
    animated: Flags.boolean({ char: "a", default: false }),
  };

  static args = [
    {
      name: "input",
      required: true,
      description: "input image file path (source)",
    },
    {
      name: "output",
      required: true,
      description: "encoded output image file path (target)",
    },
  ];

  static examples = [
    `$ ./bin/dev sharpie ./samples/in/1.jpg ./samples/out/1.avif --type avif --quality 50
Converting file ./samples/in/1.jpg using "avif" encoder with quality 50

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'

./bin/dev sharpie ./samples/in/animated.gif ./samples/out/animated.webp --type webp --quality 90 --animated
`,
  ];

  protected quality: number = 60;

  protected animated: boolean = false;

  async run() {
    const { args, flags } = await this.parse(Sharpie);

    const input = args.input;
    const output = args.output;
    const encType: string = flags.type ?? Encoders.JPEG;
    const encoders: String[] = Object.values(Encoders);
    const resize = undefined !== flags.resize ? JSON.parse(flags.resize) : null;
    this.animated = flags.animated;

    if (!encoders.includes(encType)) {
      this.error("You entered an invalid encoder");
      this.exit(1);
    }

    if (!input || !output) {
      this.error('Arguments "input" and "output" MUST be specified');
      this.exit(1);
    }

    if (!fs.existsSync(input)) {
      this.error("Could not find input file path");
      this.exit(1);
    }

    this.quality = flags.quality;

    // show a warning
    this.log(
      `Converting file ${input} using "${encType}" encoder with quality ${this.quality}`
    );


    //this.exit(0);

    let handle = await this.getSharpHandle(input);

    if (null === handle) {
      this.error("Could not read or convert input file path");
      this.exit(1);
    }

    if(resize){
      this.log('Piping Resize options', resize);
      handle.resize(resize);
    }

    if (encType === Encoders.AVIF) {
      handle.avif({ quality: this.quality, speed: 8 });
    }

    if (encType === Encoders.WEBP) {
      handle.webp({ quality: this.quality });
    }

    if (encType === Encoders.JPEG) {
      handle.jpeg({ mozjpeg: true, quality: this.quality, progressive: true }).flatten({ background: resize.background })
    }

    if (encType === Encoders.PNG) {
      handle.png({ quality: this.quality, progressive: true, compressionLevel: 8, palette: true });
    }

    if (encType === Encoders.GIF) {
      handle.gif();
    }

    handle.toFile(output, (err, info) => {
      this.log("Encoder output", info);
      this.fileSaved(output);
    });
  }

  async getSharpHandle(filePath: string): Promise<sharp.Sharp | null> {
    const inputBuffer = fs.readFileSync(filePath);
    return sharp(inputBuffer, {
      animated: this.animated
    });
  }

  protected fileSaved(path: string) {
    this.log(`File successfully saved at "${path}"`);
  }
}
