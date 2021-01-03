const express = require("express");
const { default: axios } = require("axios");

const port = parseInt(process.env.PORT || "8190");
const app = express();

// Function to poll apps every 2 minutes to keep them warm
const pollApps = () => {
 setInterval(async () => {
  const coreAppResponse = await axios.get(
   "https://leadwallet-core-cliwa3gezq-uc.a.run.app/api/v1/"
  );
  const multisenderAppResponse = await axios.get(
   "https://leadwallet-multisender-cliwa3gezq-uc.a.run.app/api"
  );
  console.log(
   "Core App Response: ",
   JSON.stringify(coreAppResponse.data, null, 2)
  );
  console.log(
   "Multisender App Response: ",
   JSON.stringify(multisenderAppResponse.data, null, 2)
  );
 }, 60 * 2 * 1000);
};

app.listen(port, () => {
 console.log("Polling app is up on: ", port);
 pollApps();
});
