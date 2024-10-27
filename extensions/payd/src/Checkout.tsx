import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
  Button,
  Link,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();
  const [showUrl, setShowUrl] = useState(false);


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="payd" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <Banner title="payd">
        <Text>
          {"Get paid faster with Payd. Create a custom payment link for your customers."}
        </Text>
      </Banner>
      <Checkbox onChange={onCheckboxChange}>
        {"I would like a custom payment link"}
      </Checkbox>
      {showUrl && (
        <Link to="https://link.payd.one" external>
          {"link.payd.one"}
        </Link>
      )}
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout attributes
    setShowUrl(isChecked);
  }
}