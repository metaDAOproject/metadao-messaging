import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { FutarchyRPCClient } from "@metadaoproject/futarchy-sdk";
//import pkg from "@metadaoproject/futarchy-sdk";
// const d = require("@metadaoproject/futarchy-sdk");
import { AnchorProvider } from '@coral-xyz/anchor';
import { Connection, Keypair } from '@solana/web3.js';
// import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

if (!BOT_TOKEN || !CHANNEL_ID) {
  console.error('Error: BOT_TOKEN or CHANNEL_ID is not set in the .env file');
  process.exit(1);
}

console.log('[SETUP] Bot token and channel ID loaded successfully');

const bot = new Telegraf(BOT_TOKEN);

async function sendHelloWorld() {
  const connection = new Connection('https://api.devnet.solana.com');
  const keypair = Keypair.generate();
  // const wallet =
  // const nodeWallet = new NodeWallet(keypair);

  const provider = new AnchorProvider(connection, undefined);
  // console.log(d);
  const client = FutarchyRPCClient.make(provider, undefined);
  console.log(client.futarchyProtocols);
  // client.daos.fetchDao("14YsfUtP6aZ5UHfwfbqe9MYEW4VaDwTHs9NZroAfV6Pi", )

  console.log('[SEND] Attempting to send message...');
  try {
    await bot.telegram.sendMessage(CHANNEL_ID as string, 'HelloWorld');
    console.log('[SEND] Message sent successfully');
  } catch (error) {
    console.error('[SEND] Error sending message:', error);
  }
}

// Add an immediate message send attempt
console.log('[IMMEDIATE] Attempting to send a message immediately');
sendHelloWorld().catch(error => console.error('[IMMEDIATE] Error in immediate send:', error));


console.log('[SETUP] Script setup complete. Waiting for events...');
