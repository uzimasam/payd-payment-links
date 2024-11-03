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
  Grid,
  View,
  GridItem,
  BlockSpacer,
  useTotalAmount,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

// Constants
const PAYMENT_API_URL = 'https://global.paydexp.com/api/v1/payment/init';
const CALLBACK_URL = 'https://uzimasam.myshopify.com/callback';
const RETURN_URL = 'https://uzimasam.myshopify.com/';
const API_CREDENTIALS = {
  username: 'bzz8v6SfbyhAGaK5YUuU',
  password: 'UuERDoplni92QFUONPrfFQzNcMVf3sSeaAiIaiah',
  wallet: 'uzima',
};

// Extension component
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const currencyCode = useTotalAmount().currencyCode;
  const totalAmount = useTotalAmount().amount;
  const instructions = useInstructions();

  // State management
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [showUrl, setShowUrl] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (field) => (value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  // API request handler
  async function createPaymentSession(data) {
    try {
      const response = await fetch(PAYMENT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok && responseData.url) {
        setTrackingUrl(responseData.url);
        setError(null);
      } else {
        console.error("Payment API Error:", responseData);
        setError(responseData.error || 'Failed to generate the payment link. Please try again.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setError('A network error occurred. Please try again.');
    }
  }

  const handleButtonClick = () => {
    const { firstName, lastName, phoneNumber, email } = userData;
    const payload = {
      ...API_CREDENTIALS,
      reference: "123456",
      amount: totalAmount,
      currency: currencyCode,
      narration: "Payment for goods",
      email,
      name: `${firstName} ${lastName}`,
      phone: phoneNumber,
      callback_url: CALLBACK_URL,
      redirect_url: RETURN_URL,
    };
    createPaymentSession(payload);
  };

  if (!instructions.attributes.canUpdateAttributes) {
    return (
      <Banner title="payd" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  return (
    <BlockStack border="dotted" padding="tight">
      <Banner title="payd">
        <Text>
          {"Get paid faster with Payd. Create a custom payment link for your customers."}
        </Text>
      </Banner>
      <Checkbox onChange={(isChecked) => setShowUrl(isChecked)}>
        {"I would like a custom payment link"}
      </Checkbox>
      {showUrl && (
        <BlockStack spacing="base">
          <Grid columns={['1fr', '1fr']} spacing="base">
            <View>
              <TextField
                label="First name"
                required
                value={userData.firstName}
                onChange={handleInputChange("firstName")}
              />
            </View>
            <View>
              <TextField
                label="Last name"
                required
                value={userData.lastName}
                onChange={handleInputChange("lastName")}
              />
            </View>
            <GridItem columnSpan={2}>
              <PhoneField
                label="Phone number"
                required
                value={userData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
              />
            </GridItem>
            <GridItem columnSpan={2}>
              <TextField
                label="Email"
                type="email"
                required
                value={userData.email}
                onChange={handleInputChange("email")}
              />
            </GridItem>
            <View>
              <TextField label="Currency" value={currencyCode} disabled />
            </View>
            <View>
              <TextField label="Amount" value={totalAmount.toString()} disabled />
            </View>
          </Grid>
          <BlockSpacer spacing="base" />
          <Button onPress={handleButtonClick}>
            Generate Payment Link for {currencyCode} {totalAmount}
          </Button>
        </BlockStack>
      )}
      {trackingUrl && (
        <Banner status="success">
          <Text>
            <Link to={trackingUrl} external>
              Make payment via Payd
            </Link>
          </Text>
        </Banner>
      )}
      {error && (
        <Banner title="Error" status="critical">
          <Text>{error}</Text>
        </Banner>
      )}
    </BlockStack>
  );
}
