//

export default function handler(_: any, res: { end: (arg0: string) => void }) {
  // need to add cron job for rebuild every week or month
  /**
    * 
    * 
    *   - Go to your project → Settings → Git → Deploy Hooks

       - Create one, copy the URL

      - Hit that URL from your Vercel Cron Job monthly → it will trigger a new build

      link: https://vercel.com/sabeer/{project-name}/settings/cron-jobs
    */
  res.end("Hello Cron!");
}
