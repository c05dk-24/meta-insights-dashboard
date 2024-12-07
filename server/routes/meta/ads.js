import express from 'express';
import axios from 'axios';
import { authenticate } from '../../middleware/auth.js';
import { getDateRange, aggregateInsights } from '../../utils/meta.js';
import { User } from '../../models/index.js';

const router = express.Router();

// Fetch ads for an ad set
router.get('/adsets/:adSetId/ads', authenticate, async (req, res) => {
  const { adSetId } = req.params;
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
      `https://graph.facebook.com/v15.0/${adSetId}/ads`,
      { params }
    );

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching ads:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch ads." });
  }
});

// Fetch ad insights
router.get('/:adId/insights', authenticate, async (req, res) => {
  const { adId } = req.params;
  const { start_date, end_date } = req.query;

  try {
    const params = {
      fields: "ad_name,impressions,clicks,spend,actions",
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    };

    if (start_date && end_date) {
      params.time_range = JSON.stringify({
        since: start_date,
        until: end_date,
      });
    }

    const response = await axios.get(
      `https://graph.facebook.com/v15.0/${adId}/insights`,
      { params }
    );

    const insights = response.data.data.map((item) => ({
      ad_name: item.ad_name,
      impressions: item.impressions,
      clicks: item.clicks,
      spend: item.spend,
      leads: item.actions?.find((action) => action.action_type === "lead")?.value || 0,
      cost_per_lead: item.spend / (item.actions?.find((a) => a.action_type === "lead")?.value || 1),
    }));

    res.status(200).json(insights);
  } catch (error) {
    console.error("Error fetching ad insights:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch ad insights." });
  }
});

// Fetch account insights
router.get('/insights', authenticate, async (req, res) => {
  const { range } = req.query;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.meta_ad_id) {
      return res.status(400).json({ error: "Meta ad ID not found for the authenticated user." });
    }

    const account_id = `act_${user.meta_ad_id.trim()}`;
    const { startDate, endDate } = getDateRange(range);
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Invalid range provided." });
    }

    const response = await axios.get(
      `https://graph.facebook.com/v15.0/${account_id}/insights`,
      {
        params: {
          fields: "spend,impressions,actions",
          time_range: JSON.stringify({ since: startDate, until: endDate }),
          access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        },
      }
    );

    const aggregated = aggregateInsights(response.data.data);
    res.status(200).json(aggregated);
  } catch (error) {
    console.error("Error fetching account insights:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch account insights." });
  }
});

export default router;