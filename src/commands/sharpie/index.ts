import { Command, Flags } from "@oclif/core";

import * as fs from "fs";
import * as sharp from "sharp";
import { optimize } from "svgo";

enum Encoders {
  JPEG = "jpeg",
  WEBP = "webp",
  AVIF = "avif",
  PNG = "png",
  GIF = "gif",
  SVG = "svg",
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
      description:
        "Number between 1-100 to set quality of the output image. Default: 60",
    }),
    blur: Flags.integer({
      char: "b",
      default: 0,
      description:
        "Number between 1-100 to set bluriness of the output image. Default: 0 (disabled)",
    }),
    // flag with a value (-n, --name=VALUE)
    type: Flags.string({
      char: "t",
      default: Encoders.WEBP,
      description:
        "encoder to use - choose from: jpeg, webp, avif, png and svg",
    }),
    resize: Flags.string({
      char: "r",
      description:
        "a JSON object to pass manipulations to Sharp.js 'resize' method",
    }),
    extractBefore: Flags.string({
      char: "e",
      description:
        "a JSON object to pass manipulations to Sharp.js 'extract' method, BEFORE resize",
    }),
    extractAfter: Flags.string({
      char: "E",
      description:
        "a JSON object to pass manipulations to Sharp.js 'extract' method, AFTER resize",
    }),
    // flag with no value (-f, --force)
    animated: Flags.boolean({
      char: "a",
      default: false,
      description: "Do not remove animation layers",
    }),
    sharpen: Flags.boolean({
      char: "s",
      default: false,
      description: "Auto sharp image",
    }),
    normalize: Flags.boolean({
      char: "n",
      default: false,
      description:
        "Enhance output image contrast by stretching its luminance to cover the full dynamic range",
    }),
    greyscale: Flags.boolean({
      char: "g",
      default: false,
      description: "Convert to 8-bit greyscale; 256 shades of grey",
    }),
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

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2after.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}' --extractAfter '{"left": 10, "top": 50, "width": 100, "height": 80}'

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2before.webp --type webp --quality 70 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}' --extractBefore '{"left": 10, "top": 50, "width": 600, "height": 800}'

./bin/dev sharpie ./samples/in/animated.gif ./samples/out/animated.webp --type webp --quality 90 --animated

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2sharp.webp --type webp --quality 70 --sharpen --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2blur.webp --type webp --quality 20 --blur 10 --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'

./bin/dev sharpie ./samples/in/2.jpg ./samples/out/2normalize.webp --type webp --quality 70 --normalize --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'

./bin/dev sharpie ./samples/in/rally-car.jpg ./samples/out/rally-car_grey.webp --type webp --quality 70 --greyscale --resize '{"width": 500, "height": 500, "fit": "contain", "background": "#ffffff"}'

./bin/dev sharpie ./samples/in/logo.svg ./samples/out/logo.svg --type svg
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
    const extractBefore =
      undefined !== flags.extractBefore
        ? JSON.parse(flags.extractBefore)
        : null;
    const extractAfter =
      undefined !== flags.extractAfter ? JSON.parse(flags.extractAfter) : null;
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
    const sharpen = flags.sharpen;
    const blur = flags.blur;
    const normalize = flags.normalize;
    const greyscale = flags.greyscale;

    // show a warning
    this.log(
      `Converting file ${input} using "${encType}" encoder with quality ${this.quality}`
    );

    // if we have SVG sharpJs it not used!
    if (encType === Encoders.SVG) {
      let totalSavedBytes = 0;

      const sourceSvg = fs.readFileSync(input);

      let result;
      try {
        result = optimize(sourceSvg.toString(), {
          path: input,
        });

        const savedBytes = sourceSvg.length - result.data.length;
        const percentage = Math.round((savedBytes / sourceSvg.length) * 100);
        totalSavedBytes += savedBytes;
        this.log(
          `Output to file ${output} saving "${savedBytes}" bytes (${percentage}%)`
        );
        fs.writeFileSync(output, result.data);
      } catch (error) {
        this.error(`${input}: ${error}`);
      }
      this.exit(0);
    }

    //this.exit(0);

    let handle = await this.getSharpHandle(input);

    if (null === handle) {
      this.error("Could not read or convert input file path");
      this.exit(1);
    }

    if (extractBefore) {
      this.log("Passing Extract.Before options", extractBefore);
      handle.extract(extractBefore);
    }

    if (resize) {
      this.log("Passing Resize options", resize);
      handle.resize(resize);
      if (
        resize.hasOwnProperty("background") &&
        "#ffffff" === resize.background
      ) {
        handle.flatten({ background: resize.background });
      }
    }

    if (extractAfter) {
      this.log("Passing Extract.After options", extractAfter);
      handle.extract(extractAfter);
    }

    if (sharpen) {
      this.log("Auto-sharpening enabled...");
      handle.sharpen();
    }

    if (normalize) {
      this.log("Auto-normalizing enabled...");
      handle.normalize();
    }

    if (greyscale) {
      this.log("Converting to greyscale...");
      handle.normalize();
      handle.greyscale();
    }

    if (blur > 0) {
      this.log("Blurring image to number: " + blur);
      handle.blur(blur);
    }

    // ENCODING

    if (encType === Encoders.AVIF) {
      handle.avif({
        quality: this.quality,
        effort: 5,
        chromaSubsampling: "4:2:0",
      });
    }

    if (encType === Encoders.WEBP) {
      handle.webp({ quality: this.quality });
    }

    if (encType === Encoders.JPEG) {
      handle
        .jpeg({ mozjpeg: true, quality: this.quality, progressive: true })
        .flatten({ background: resize.background });
    }

    if (encType === Encoders.PNG) {
      handle.png({
        quality: this.quality,
        progressive: true,
        compressionLevel: 8,
        palette: true,
      });
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
      animated: this.animated,
    });
  }

  protected fileSaved(path: string) {
    this.log(`File successfully saved at "${path}"`);
  }
}
