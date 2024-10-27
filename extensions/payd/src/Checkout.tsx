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
  TextField,
  PhoneField,
  Form,
  Grid,
  View,
  GridItem,
  BlockSpacer,
  useTotalAmount,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const currencyCode = useTotalAmount().currencyCode;
  const totalAmount = useTotalAmount().amount;
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
        <Form
        onSubmit={() =>
          console.log('onSubmit event')
        }
      >
        <Grid
          columns={['1fr', '1fr']}
          spacing="base"
        >
          <View>
            <TextField label="First name" required />
          </View>
          <View>
            <TextField label="Last name" required />
          </View>
          <GridItem columnSpan={2}>
            <PhoneField label="Phone number" required />
          </GridItem>
          <GridItem columnSpan={2}>
            <TextField label="Email" type="email" required />
          </GridItem>
          <View>
            <TextField label="currency" required value={currencyCode} disabled />
          </View>
          <View>
            <TextField label="Amount" value={totalAmount.toString()} disabled />
          </View>
        </Grid>
        <BlockSpacer spacing="base" />
        <Button accessibilityRole="submit">
          Generate Payment Link for {currencyCode} {totalAmount}
        </Button>
      </Form>
      )}
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout attributes
    setShowUrl(isChecked);
  }
}