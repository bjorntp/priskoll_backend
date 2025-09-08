import { spawn } from "child_process";

const fetchProductData: (executablePath: string, args: string[]) => Promise<String> = async (executablePath: string, args: string[]) => {
  return new Promise((resolve, reject) => {
    const process = spawn(executablePath, args);
    let rawData = '';

    process.stdout.on('data', (chunk: String) => {
      rawData += chunk.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(rawData));
        } catch (error) {
          reject("Error: " + error);
        }
      } else {
        reject("Error");
      }
    });
  });
}

export { fetchProductData };
