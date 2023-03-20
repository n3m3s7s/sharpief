/*import { Command, Flags } from "@oclif/core";
import {
  parseURL,
  resolveConfigs,
  applyTransforms,
  builtins,
  loadImage,
  generateTransforms,
  builtinOutputFormats,
  urlFormat,
  extractEntries,
} from "imagetools-core";
import { ImageConfig } from "imagetools-core"
import { createHash } from 'crypto'

export default class Hello extends Command {
  static description = "Say hello";

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ];

  static flags = {
    from: Flags.string({
      char: "f",
      description: "Whom is saying hello",
      required: true,
    }),
  };

  static args = [
    { name: "person", description: "Person to say hello to", required: true },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Hello);

    this.log(`hello ${args.person} from ${flags.from}!`);



  function generateImageID(url: URL, config: ImageConfig) {
    return createHash('sha1').update(url.pathname).update(JSON.stringify(config)).digest('hex')
  }

    //const id = "file://./samples/in/2.jpg?w=300;500;700&format=webp";
    const id = "file://./samples/in/2.jpg?w=300;500;700&format=avif;webp;jpg&source";

    const srcURL = parseURL(id);

    console.log(srcURL, "srcURL");

    let directives = srcURL.searchParams;

    console.log(directives, "directives");

    directives = new URLSearchParams([...srcURL.searchParams]);

    console.log(directives, "directives 2");

    if (!directives.toString()) {
      throw new Error("cannot proceed");
    }

    const parameters = extractEntries(directives);

    console.log(parameters, "parameters");

    // this function handles the ArgumentList logic
    // and produces an array of config objects that can be passed to generateTransforms
    const imageConfigs = resolveConfigs(parameters, builtinOutputFormats);

    console.log(imageConfigs, "imageConfigs");

    const img = loadImage(decodeURIComponent("." + srcURL.pathname));
    const outputMetadatas = []
    const generatedImages = new Map();

    for (const config of imageConfigs) {
      const id = generateImageID(srcURL, config);

      const { transforms, parametersUsed } = generateTransforms(config, builtins);
      console.log(transforms, "transforms")

      const { image, metadata } = await applyTransforms(
        transforms,
        img.clone(),
        true
      );

      generatedImages.set(id, image);

      metadata.src = id;

      metadata.image = image;

      outputMetadatas.push(metadata);
    }

    let outputFormat = urlFormat();

    for (const [key, format] of Object.entries(builtinOutputFormats)) {
      if (directives.has(key)) {
        const params = directives
          .get(key)
          ?.split(";")
          .filter((v: string) => !!v);
        outputFormat = format(params?.length ? params : undefined);
        break;
      }
    }

    const output = outputFormat(outputMetadatas)

    console.log(output, "output")
    console.log(outputMetadatas, "outputMetadatas")

    // This function takes our config and an array of transformFactories and creates an array of transforms
    // the resulting array of transforms can be cached
    /*configs.map(async (config) => {
      const { transforms } = generateTransforms(config, builtins);

      // apply the transforms and transform the given image
      const { image: transformedImage, metadata } = await applyTransforms(
        transforms,
        img,
        true
      );

      console.log(transformedImage, "transformedImage");
      console.log(metadata, "metadata");
    });*/
  /*}
}
*/
