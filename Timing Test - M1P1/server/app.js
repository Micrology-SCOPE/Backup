const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
// const baseFilePath = "./Test_Data_12";
const baseFilePath = "./Test_Data_12_copy";
// const baseFilePath = "./Test_Data_12_Main";
const allowedFileTypes = ["CO", "T", "AI", "M", "P", "A"];

// Middleware
app.use(express.json());
app.use(cors());

// Function to read data from a file based on the channel number and file type asynchronously
function readDataFromChannel(channelNumber, fileType, fileCounts) {
  return new Promise((resolve, reject) => {
    const filename = fileType.toUpperCase();
    if (!allowedFileTypes.includes(filename)) {
      return reject(new Error("Invalid file type"));
    }

    const filePath = `${baseFilePath}/${filename}${channelNumber}.txt`;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return resolve("File not found");
        } else {
          console.error(
            `Error reading the file for channel ${channelNumber}:`,
            err
          );
          return reject(err);
        }
      }

      const lines = data.trim().split("\n");

      // Convert each line to an integer and store it in the dataPoints array
      const dataPoints = lines.map((line) => {
        const originalValue = parseInt(line.trim(), 10);
        let modifiedValue = originalValue;

        if (filename === "CO") {
          modifiedValue += channelNumber * 5000;
        } else if (filename === "T") {
          modifiedValue += fileCounts.CO * 5000 + channelNumber * 5000;
        } else if (filename === "AI") {
          modifiedValue +=
            (fileCounts.CO + fileCounts.T) * 5000 + channelNumber * 5000;
        } else if (filename === "M") {
          modifiedValue +=
            (fileCounts.CO + fileCounts.T + fileCounts.AI) * 5000 +
            channelNumber * 5000;
        } else if (filename === "P") {
          modifiedValue +=
            (fileCounts.CO + fileCounts.T + fileCounts.AI) * 5000 +
            channelNumber * 5000;
        } else if (filename === "A") {
          modifiedValue +=
            (fileCounts.CO + fileCounts.T + fileCounts.AI + fileCounts.M) *
              5000 +
            channelNumber * 5000;
        }

        return modifiedValue;
      });

      resolve(dataPoints);
    });
  });
}

// // Function to read data from a file based on the channel number and file type asynchronously
// function readDataFromChannel(channelNumber, fileType, fileCounts) {
//   return new Promise((resolve, reject) => {
//     const filename = fileType.toUpperCase();
//     if (!allowedFileTypes.includes(filename)) {
//       return reject(new Error("Invalid file type"));
//     }

//     const filePath = `${baseFilePath}/${filename}${channelNumber}.txt`;
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         if (err.code === "ENOENT") {
//           return resolve("File not found");
//         } else {
//           console.error(
//             `Error reading the file for channel ${channelNumber}:`,
//             err
//           );
//           return reject(err);
//         }
//       }

//       const lines = data.trim().split("\n");

//       // Convert each line to an integer and store it in the dataPoints array
//       const dataPoints = lines.map((line) => {
//         const originalValue = parseInt(line.trim(), 10);
//         let modifiedValue = originalValue;

//         if (originalValue === 0) {
//           modifiedValue = null; // If the value is 0, set it to null
//         } else {
//           if (filename === "M") {
//             modifiedValue += channelNumber * 50;
//           } else if (filename === "P") {
//             modifiedValue += fileCounts.M * 50 + channelNumber * 50;
//           }
//         }

//         return modifiedValue;
//       });

//       resolve(dataPoints);
//     });
//   });
// }

// Define the calculateMaxFileCount function
function calculateMaxFileCount(fileCounts) {
  let maxCount = 0;
  for (const fileType in fileCounts) {
    if (fileCounts[fileType] > maxCount) {
      maxCount = fileCounts[fileType];
    }
  }
  return maxCount;
}

// API endpoint to get calculated value
app.get("/api/calculated-value", (req, res) => {
  const calculatedValue =
    (fileCounts.CO +
      fileCounts.T +
      fileCounts.AI +
      fileCounts.M +
      fileCounts.P +
      fileCounts.A) *
    5000;
  const fileCount = calculateMaxFileCount(fileCounts);

  return res.json({ calculatedValue, fileCount });
});

// Function to count files in the specified directory for each file type
function countFilesInDirectory(directoryPath, allowedFileTypes) {
  const fileCounts = {};

  allowedFileTypes.forEach((fileType) => {
    const fileTypeRegex = new RegExp(`${fileType}\\d+\\.txt$`, "i");
    const filesOfType = fs
      .readdirSync(directoryPath)
      .filter((filename) => fileTypeRegex.test(filename));
    fileCounts[fileType] = filesOfType.length;
  });

  return fileCounts;
}

// API endpoint to get data from all files based on the channel number asynchronously
app.get("/api/channel/:channelNumber/:fileType", async (req, res) => {
  const channelNumber = parseInt(req.params.channelNumber);
  const fileType = req.params.fileType;

  if (isNaN(channelNumber) || channelNumber < 1) {
    return res.status(400).json({ error: "Invalid channel number" });
  }

  try {
    const dataPoints = await readDataFromChannel(
      channelNumber,
      fileType,
      fileCounts
    );
    return res.json(dataPoints);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const fileCounts = countFilesInDirectory(baseFilePath, allowedFileTypes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running and listening on localhost : ${PORT}`);
});
