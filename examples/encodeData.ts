import { Utils } from "../src/utils/Utils";

async function encodeDataExample() {
  const data = "some data to encode";

  try {
    // Encode the data
    const encodedData = Utils.encodeData(data);
    console.log(`Encoded data: ${encodedData}`);
  } catch (error) {
    console.error("Error encoding data:", error);
  }
}

// Execute the function
encodeDataExample();