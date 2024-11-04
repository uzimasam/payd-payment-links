import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  DataTable,
  Card,
  Text,
  Box,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Payd Payment Links">
        <button variant="primary">
          Refresh
        </button>
      </TitleBar>
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">
          Payment Links
        </Text>
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodyMd">
            View a summary of all payment links created by your customers.
          </Text>
          <DataTable
            columnContentTypes={[
              "numeric",
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
            ]}
            headings={[
              "#",
              "Name",
              "Email",
              "Phone",
              "Payment Link",
              "Amount",
              "Status",
              "Created At",
              "Actions",
            ]}
            rows={[
              [
                "1",
                "John Doe",
                "john.doe@example.com",
                "254xxxxxxxxx",
                "https://global.paydexp.com/sfiusfodnff",
                "KES 20",
                "Paid",
                "23rd Oct 2024 11:32 AM",
                "View",
              ],
            ]}
          />
        </Box>
      </Card>
    </Page>
  );
}
