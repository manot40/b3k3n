import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const URL = process.env.NEXT_API_URL + '/fee-assessment-books';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.query.categoryId)
      return res
        .status(400)
        .json({ success: false, message: 'Please provide categoryId' });

    // Get the total books available,
    // We need this to calculate how many pages available
    const count = await axios
      .get<Book[]>(URL, { params: { categoryId: req.query.categoryId } })
      .then(res => res.data.length || 0)
      .catch(() => 0);

    // Fetch the actual data
    const { data } = await axios.get<Book[]>(URL, {
      params: { ...req.query, page: +req.query.page - 1 },
    });

    res.status(200).json({
      message: 'Success fetching all books',
      success: true,
      count,
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
