'use client'
import "./home.css";
import Image from "next/image";
import Mock from 'mockjs';
import * as React from "react";
import { useEffect, useState } from 'react';
import {Divider,Button,Input, Listbox,
  ListboxItem} from "@nextui-org/react";
import { hash } from "crypto";

interface  Items  {
  hash:string,
  from:string,
  to:string,
}

const defaultList:Items[] = generateArray()
 

function generateRandomString(length:number, startsWithDigit:boolean) {
  const digits = '0123456789';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // 如果要求以数字开头
  if (startsWithDigit) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
    // 剩余长度的字符可以从更广泛的字符集中选择
    for (let i = 1; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } else {
    // 如果不要求以数字开头，但长度和字符集仍然需要遵守
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
   
  }

  return result;
}

function generateArray() {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push({
      hash: generateRandomString(16, true),  // 以数字开头的16位字符串
      from: generateRandomString(4, false)+'...'+generateRandomString(4, false), // 10位字符串（不要求以数字开头）
      to: generateRandomString(4, false)+'...'+generateRandomString(4, false)   // 同上
    });
  }
  return array;
}


 
export default function Home() {
  
  const [list, setList] = useState(defaultList);
  useEffect(() => {
    setInterval(()=>{
      const next = generateArray()
      setList(next)

    },1000)
  }, []);
  const renderList = (data:Items)=>{
    return  <ListboxItem key={data.hash}  className="border-b-small">
              <div className="flex justify-around">
                <div className="blockHash text-current flex items-center">
                  <span className="statusIcon icon-success"></span>
                   <span>{data.hash}...</span>
                </div>
                <div className="blockHeight">
                  <p>
                    block: <span className="text-current">310516949</span>
                  </p>
                  <div className="flex items-center">
                    <span className="text-current text-sm">{data.from}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 px-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    <span className="text-current text-sm">{data.to}</span>
                  </div>
                  
                </div>
                <div className="valueBox">
                    <p className="flex">
                      <Image 
                      className="pr-2"
                      src="/sol-logo.svg"
                      alt="solLogo"
                      width={19}
                      height={19}
                      priority>
                      </Image>
                      <span>Value (SOL):</span>
                      <span className="pl-2"> 1.00034</span>
                      </p>
                      <p className="flex">
                      <Image 
                      className="pr-2"
                      src="/sol-logo.svg"
                      alt="solLogo"
                      width={19}
                      height={19}
                      priority>
                      </Image>
                      <span>Fee (SOL):</span>
                      <span className="pl-2"> 0.000005</span>
                      </p>
                  </div>
              </div>
            </ListboxItem>
  }
  return (
    <div className="main">
      <div className="homepageGradient">
          <div className="options flex ">
            <div className="flex ">
              <div className="projectName">
                VAULT
              </div>
              <div className="rounded-lg px-2 py-2 gap-2 bg-[#ffffff33] backdrop-blur-[15px] hidden sm:flex relative z-10">
                <Image 
                className="dark:invert"
                src="/sol.png"
                alt="solPriceLogo"
                width={29}
                height={19}
                priority>

                </Image>
                <div className="not-italic font-normal text-[12px] leading-[16px] text-primarySolana-50 flex items-center">
                  $189.83&nbsp;<span style={{color: 'rgb(71, 183, 23)'}}>+3.5%</span> 
                <div data-orientation="vertical" role="none" className="shrink-0 bg-neutral2 w-[1px] inline-flex mx-3 h-4"></div>
                <div className="inline" data-state="closed">Avg Fee: <span className="text-[#6BC1FF]">0.00004245 </span></div>
                </div>
              </div>
            </div>
            <div className="flex  items-center space-x-4 pl-11 ">
            <div>Docs</div>
            <Divider orientation="vertical" />
            <div>Tokens</div>
            <Divider orientation="vertical" />
            <div>Nfts</div>
            </div>
            <div className="flex flex-1 justify-end">
             <Button color="primary" variant="shadow">
                Connect Wallet
              </Button>
            </div>
          </div>
      </div>
      <div className="content">
        <div className="searchBox">
          <p> Explore Solana Blockchain</p>
          <div  className="w-full flex items-center">
          <Input
                key='primary'
                color='primary'
                placeholder="input tokens"
                className="mr-10"
              />
               <Button color="primary"  >
                Search Token
              </Button>
          </div>
         
        </div>
         <div className="w-full mt-10  border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
          <div className="titleWrap flex justify-between px-2 items-center ">
            <p className="text-2xl font-bold">Network (Transactions) </p>
            <p className="text-xl text-cyan-500">353,896,035,980</p>
            <p className=" font-bold text-teal-500"> {`view all >`}</p>
          </div>
          <Listbox aria-label="Actions" >
           {list.map(i=>renderList(i))}
          </Listbox>
        </div>
      </div>
    </div>
  );
}
