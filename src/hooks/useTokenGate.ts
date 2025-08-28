import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const MINT_ADDRESS = 'ArwBHrqR721SVSqnrk6MAwvwbFZ2cvadyGyHdKxobonk';
const MIN_HOLDINGS = 50000000; // 500 tokens with 9 decimals
const HELIUS_RPC = 'https://mainnet.helius-rpc.com/?api-key=b12fadd7-ee2f-47bf-a61e-4f6e9647b8e9';

export interface TokenGateStatus {
  ok: boolean;
  balanceRaw: string;
  balanceUi: string;
  requiredRaw: string;
  requiredUi: string;
  tier: 'Angel' | 'Archangel' | 'Cherubim';
  loading: boolean;
}

export const useTokenGate = () => {
  const { publicKey } = useWallet();
  const [status, setStatus] = useState<TokenGateStatus>({
    ok: false,
    balanceRaw: '0',
    balanceUi: '0',
    requiredRaw: MIN_HOLDINGS.toString(),
    requiredUi: (MIN_HOLDINGS / 1e9).toString(),
    tier: 'Angel',
    loading: true,
  });

  const getTier = (balance: number): 'Angel' | 'Archangel' | 'Cherubim' => {
    if (balance >= 10000) return 'Cherubim';
    if (balance >= 2500) return 'Archangel';
    return 'Angel';
  };

  useEffect(() => {
    const checkTokenBalance = async () => {
      if (!publicKey) {
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await fetch(HELIUS_RPC, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getTokenAccountsByOwner',
            params: [
              publicKey.toBase58(),
              {
                mint: MINT_ADDRESS,
              },
              {
                encoding: 'jsonParsed',
              },
            ],
          }),
        });

        const data = await response.json();
        
        if (data.result?.value && data.result.value.length > 0) {
          const tokenAccount = data.result.value[0];
          const balanceRaw = parseInt(tokenAccount.account.data.parsed.info.tokenAmount.amount);
          const balanceUi = parseFloat(tokenAccount.account.data.parsed.info.tokenAmount.uiAmountString || '0');
          
          setStatus({
            ok: balanceRaw >= MIN_HOLDINGS,
            balanceRaw: balanceRaw.toString(),
            balanceUi: balanceUi.toString(),
            requiredRaw: MIN_HOLDINGS.toString(),
            requiredUi: (MIN_HOLDINGS / 1e9).toString(),
            tier: getTier(balanceUi),
            loading: false,
          });
        } else {
          setStatus({
            ok: false,
            balanceRaw: '0',
            balanceUi: '0',
            requiredRaw: MIN_HOLDINGS.toString(),
            requiredUi: (MIN_HOLDINGS / 1e9).toString(),
            tier: 'Angel',
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error checking token balance:', error);
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    checkTokenBalance();
  }, [publicKey]);

  return status;
};