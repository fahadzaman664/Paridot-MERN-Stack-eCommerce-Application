import openai from "../openaiClient.js";
import { ProductModel } from "../Models/ProductModel.js";


export const smartSearch = async (req, res) => {

    try {
        // const { query } = req.body;

//     const prompt = `
// Convert the following user query into a MongoDB filter object.
// User Query: "${query}"
// Return only a valid JSON object with properties like { category, color, maxPrice, minPrice }

// Example:
// User Query: "show me blue shirts under 3000"
// Output: { category: "shirts", color: "blue", maxPrice: 3000 }

// User Query: "${query}"
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const parsed = JSON.parse(completion.choices[0].message.content.trim());

//     // Build MongoDB query
//     const mongoQuery = {};
//     if (parsed.category) mongoQuery.category = parsed.category;
//     if (parsed.color) mongoQuery.color = parsed.color;
//     if (parsed.maxPrice) mongoQuery.price = { ...mongoQuery.price, $lte: parsed.maxPrice };
//     if (parsed.minPrice) mongoQuery.price = { ...mongoQuery.price, $gte: parsed.minPrice };

//     const products = await ProductModel.find(mongoQuery);
//       // Fallback dummy data
     // Dummy results for testing
    const results = [
  {
    _id: "abc123",
    title: "Unstitched Lawn 3pc – Pink",
    price: 2990,
    category: "women",
    color: "pink",
    image: "/images/pink-unstitched.jpg"
  },
  {
    _id: "def456",
    title: "Ready to Wear Embroidered Suit",
    price: 4200,
    category: "women",
    color: "maroon",
    image: "/images/embroidered.jpg"
  },
  {
    _id: "ghi789",
    title: "Kids Fancy Frock",
    price: 1800,
    category: "kids",
    color: "blue",
    image: "/images/kids-frock.jpg"
  }
];

    // Simulate LLM parsed filter
    const parsed = {
  category: "women",
  minPrice: 2000
};

    const filtered = results.filter((item) => {
      const matchCategory = parsed.category ? item.category.toLowerCase().includes(parsed.category.toLowerCase()) : true;
      const matchColor = parsed.color ? item.color.toLowerCase().includes(parsed.color.toLowerCase()) : true;
      const matchPrice =
        (!parsed.minPrice || item.price >= parsed.minPrice) &&
        (!parsed.maxPrice || item.price <= parsed.maxPrice);
      return matchCategory && matchColor && matchPrice;
    });

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Smart search failed" });
  }
}