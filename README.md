# OneStudy.ai Respondent App

This app serves as the place where an "interview" takes place between OneStudy and a respondent. This app is meant to be used as a
starter template and can be customized as anyone sees fit.

## Deploy

Fork this repo, click the button below for a quick deploy, or clone this repo and deploy it to your favorite hosting provider.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonestudy-ai%2Frespondent-app&env=API_KEY,NEXT_PUBLIC_API_ENDPOINT&envDescription=Get%20an%20API%20key%20by%20contacting%20onestudy.ai.%20NEXT_PUBLIC_API_ENDPOINT%20default%20should%20be%20https%3A%2F%2Fonestudy.ai%2Fapi%2F1)

## ENV Vars

The following ENV vars are required to run this app:

`API_KEY="YOUR_API_KEY_HERE"`: The API key given to you from onestudy.ai

`NEXT_PUBLIC_API_ENDPOINT=https://onestudy.ai/api/1`: The OneStudy.ai API endpoint

**NOTE:** You must get an API key from OneStudy.ai before you can use this app. Contact OneStudy.ai for more information.

## Development

Add a `.env.local` and add the above ENV vars.

Run `npm run dev` to start the NextJS server
