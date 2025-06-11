import { defineConfig, loadGraphQLHTTPSubgraph } from '@graphql-mesh/compose-cli';
import dotenv from 'dotenv';
import { SUBGRAPH_NAMES } from './constants/constants';
dotenv.config();

// Define subgraph configurations
const subgraphConfigs = {
  [SUBGRAPH_NAMES.PAYLOAD]: process.env.PAYLOAD_CMS_ENDPOINT,
  [SUBGRAPH_NAMES.AUTH_SERVICE]: process.env.AUTH_SERVICE_ENDPOINT,
  [SUBGRAPH_NAMES.USER_SERVICE]: process.env.USER_SERVICE_ENDPOINT,
  [SUBGRAPH_NAMES.NOTIFICATION_SERVICE]: process.env.NOTIFICATION_SERVICE_ENDPOINT,
} as const;

// Function to create subgraph configuration
const createSubgraphConfig = (name: string, endpoint: string | undefined) => {
  if (!endpoint) {
    console.warn(`Endpoint for ${name} is not configured, skipping...`);
    return null;
  }

  try {
    return {
      sourceHandler: loadGraphQLHTTPSubgraph(name, {
        endpoint,
        timeout: 5000, // 5 second timeout
        retry: 2, // Number of retries
      }),
    };
  } catch (error) {
    console.error(`Failed to load subgraph ${name}:`, error);
    return null;
  }
};

// Create subgraphs configuration
const subgraphs = Object.entries(subgraphConfigs)
  .map(([name, endpoint]) => createSubgraphConfig(name, endpoint))
  .filter((subgraph): subgraph is NonNullable<typeof subgraph> => subgraph !== null);

export const composeConfig = defineConfig({
  subgraphs,
  additionalTypeDefs: `
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.6", import: ["@authenticated"])
  `,
});
