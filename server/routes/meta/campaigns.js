import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { getFormattedMetaAdId } from '../../utils/meta.js';

const router = express.Router();

// Fetch campaigns
router.get('/', authenticate, async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const metaAdId = await getFormattedMetaAdId(req.user.id);

    const params = {
      fields: "id,name,effective_status",
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    };

    if (start_date && end_date) {
      params.time_range = JSON.stringify({
        since: start_date,
        until: end_date,
      });
    }

    const response = await axios.get(
      `https://graph.facebook.com/v15.0/${metaAdId}/campaigns`,
      { params }
    );

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching campaigns:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch campaigns." });
  }
});

// Fetch ad sets for a campaign
router.get('/:campaignId/adsets', authenticate, async (req, res) => {
  const { campaignId } = req.params;
  const { start_date, end_date } = req.query;

  try {
    const params = {
      fields: "id,name,status",
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    };

    if (start_date && end_date) {
      params.time_range = JSON.stringify({
        since: start_date,
        until: end_date,
      });
    }

    const response = await axios.get(
      `https://graph.facebook.com/v15.0/${campaignId}/adsets`,
      { params }
    );

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching ad sets:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch ad sets." });
  }
});

export default router;