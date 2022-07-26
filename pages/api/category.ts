import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const URL = process.env.NEXT_API_URL + '/fee-assessment-categories';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get<Category[]>(URL);
    res.status(200).json({
      message: 'Success fetching available category',
      success: true,
      data,
    });
  } catch (err: any) {
    const { response } = err;
    res.status(response.status || 500).json({
      success: false,
      message: response.data?.message || 'Error when fetching resource(s)',
    });
  }
}
