/**
 * This file contains the logic for requesting payment with the Mash SDK.
 * Edit this file with your Mash account details to earn money for the game!
 */
import Mash from "@getmash/client-sdk";

/**
 * =================================
 *  STEP 2: Setting up the Mash SDK
 * =================================
 *
 * After signing up with Mash (https://wallet.getmash.com/earn), you will be assigned a unique "Earner ID".
 * This ID tells Mash who will be receiving funds for any payments.
 * 
 * Instructions:
 *   2a. Copy your "Earner ID" from the Mash web app at https://wallet.getmash.com/earn/settings.
 *   2b. Uncomment the 2 lines below, and replace <YOUR_EARNER_ID> with your copied Earner ID.
 */

 const mash = new Mash({ earnerID: "7540cca4-e6da-4597-87ee-6311d391ed5f"});
 mash.init();

/**
 * =============================
 *  STEP 3: Configuring pricing
 * =============================
 *
 * After setting up your pricing with Mash, we need to tell Mash how much to charge per event.
 * This is done by providing Mash with a "Pricing Category Tag", which is another unique ID.
 *
 * Instructions:
 *   3a. Visit the "Pay-Per-Use" page at https://wallet.getmash.com/earn/pay-per-use.
 *   3b. Under the "Pay-Per-Use Monetization" header, click "Begin Setup".
 *       (Or, if you already have some categories setup, click the "Add another Pricing Category" option.)
 *   3c. Select "Any event or click" from the experience type option list.
 *   3d. Specify a title (ex. "Pet the Rock"), a cost, and the number of freebies you want to allow each month.
 *       The title, along with how much you'll be charging, will be displayed to users in the Mash wallet installed
 *       in your web app.
 *   3e. Click "Apply Pricing and Continue".
 *   3f. Visit the pricing list and copy the "Mash Price Category Tag" for your new pricing category.
 *       It can be found at https://wallet.getmash.com/earn/pay-per-use/pricing-list.
 *   3g. Uncomment the line below and replace "<YOUR_PRICING_TAG>" with the tag copied from the Mash platform app.
 */

 const PRICE_CATEGORY_TAG = "d7a03a44-12ee-433b-906e-4f7bc15d6b7a";

/**
 * Requests access with the Mash SDK. If the user has no freebies left, it will request a payment.
 * @returns {Promise<boolean>} If true, access has been granted (payment has been made).
 */
export async function requestAccess() {
  /**
    * ==================================================
    *  STEP 4: Connecting the Mash SDK to your web app
    * ==================================================
    * 
    * After configuring Mash and setting up your pricing, you'll just need to connect your app to the SDK.
    * This is done by calling the "access" function made available in the SDK.
    * For more information on the SDK, see https://www.npmjs.com/package/@getmash/client-sdk.
    * To see how the web app is using the result of this SDK call, see src/main.js in this project.
    *
    * Instructions:
    *   4a. Replace the line of code below with:
    * 
    *       return mash.access(PRICE_CATEGORY_TAG);
    *
    *   4b. Test out the web app to see Mash charging per interaction!
    */
  
  return mash.access(PRICE_CATEGORY_TAG);
}
