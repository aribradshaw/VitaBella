// Maps product categories to an array of product Slugs (in order of priority for ProductCategorySlider)
// If a category is not listed, default order from products.json is used.

const productCategoryOrder: Record<string, string[]> = {
  "weight loss": [
    "semaglutide",
    "tirzepatide",
    "bio-boost-plus",
    "nad",
    "5-amino-1mq",
    "sermorelin",
    "metformin",
    "low-dose-naltrexone"
  ],
  "hormone therapy": [
    "testosterone-cypionate",
    "enclomiphene",
    "tesamorelin",
    "sermorelin",
    "igf-1-lr3",
    "hcg",
    "testosterone-cyp-w-anastrozole",
    "hexarelin"
  ],
  "anti-aging": [
    "nad",
    "metformin",
    "rapamycin",
    "glutathione",
    "5-amino-1mq",
    "vitamin-d",
    "methylcobalamin-b-12",
    "bio-boost-plus",
    "elamipretide-ss-31"
  ],
  "sexual wellness": [
    "sildenafil-tadalafil",
    "sildenafil",
    "oxytocin",
    "blood-pump",
    "tadalafil",
    "nitro-amino",
    "oxytocin-tadalafil-sildenafil"
  ],
  "cognitive health": [
    "nad-vial",
    "5-amino-1mq",
    "methylene-blue",
    "metformin",
    "methylcobalamin-b-12",
    "nad"
  ],
  // Hair Loss and Skin Care: order is good, so not included
  "injury and recovery": [
    "igf-1-lr3",
    "tesamorelin",
    "sermorelin",
    "nandrolone",
    "oxandrolone",
    "nitro-amino",
    "hexarelin",
    "bpc-157"
  ]
};

export default productCategoryOrder;
