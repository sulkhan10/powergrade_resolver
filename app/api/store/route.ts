// API Route to fetch products
export async function GET() {
    const products = [
      {
        title: "v3 Presets",
        price: "$49.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Complete Collection",
        price: "$99.00",
        originalPrice: "$150.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "v2 Presets",
        price: "$39.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "v1 Presets",
        price: "$29.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Film Inspired Presets",
        price: "$29.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "LUTs",
        price: "$19.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Zine #4 Kyoto",
        price: "$7.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Zine #3 Thailand",
        price: "$7.00",
        image: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
      },
    ];
  
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  