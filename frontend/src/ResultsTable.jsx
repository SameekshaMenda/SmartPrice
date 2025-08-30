function ResultsTable({ results }) {
  if (!results.length)
    return <p className="text-gray-500 text-center mt-4">No results found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Platform</th>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Buy</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{item.platform}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4 text-green-600 font-semibold">{item.price}</td>
              <td className="px-6 py-4">
                <img
                  src={
                    item.image && item.image.startsWith("http")
                      ? item.image
                      : "https://via.placeholder.com/100?text=No+Image"
                  }
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />
              </td>
              <td className="px-6 py-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Buy Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional note below the table */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        ⚠️ Some products may not include images due to source limitations.
      </p>
    </div>
  );
}

export default ResultsTable;
