"use client";

import { useState } from "react";
import { useMount } from "react-use";
import { usePlaidLink } from "react-plaid-link";

import {
  useCreateLinkToken,
  useExchangePublicToken,
} from "@/features/plaid/core/services/api/mutations.api";

import { Button } from "@/components/ui/button";

const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);
  const { mutate: createLinkToken } = useCreateLinkToken();
  const {
    mutate: exchangePublicToken,
    isPending: isPendingExchangePublicToken,
  } = useExchangePublicToken();

  useMount(() => {
    createLinkToken(undefined, {
      onSuccess: ({ data }) => setToken(data),
    });
  });

  const plaid = usePlaidLink({
    token,
    onSuccess: (publicToken) => {
      exchangePublicToken({ json: { publicToken } });
    },
    env: "sandbox",
  });

  const handleConnectClick = () => {
    plaid.open();
  };

  const isDisabled = !plaid.ready || isPendingExchangePublicToken || !token;

  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={isDisabled}
      onClick={handleConnectClick}
    >
      Connect
    </Button>
  );
};

export default PlaidConnect;
