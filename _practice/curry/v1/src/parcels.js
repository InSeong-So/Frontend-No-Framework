// // non-curring
// // given a database of global parcels like this...
// const allGlobalParcels = [
//   {
//     created: 576424800000,
//     location: 'aus',
//     properties: {},
//   },
//   {
//     created: 1558163267311,
//     location: 'us',
//     properties: {},
//   },
//   //...2701201201 more items
// ];

// const sortParcelsByCountry = (parcels, country, order) => {
//   // 1. Filter our list to only include parcels from 'country;
//   const countryParcels = parcels.filter(parcel => parcel.location === country);

//   // 2. Sort the list of parcels by date created
//   const sortedResult = [...countryParcels].sort((a, b) => {
//     if (order === 'ascending') return a.created - b.created;
//     // by default return packages by descending order
//     return b.created - a.created;
//   });

//   return sortedResult;
// };

// const ausParcelsAsc = sortParcelsByCountry(
//   allGlobalParcels,
//   'aus',
//   'ascending',
// );
// const ausParcelsDsc = sortParcelsByCountry(
//   allGlobalParcels,
//   'aus',
//   'descending',
// );

// given a database of global parcels like this...
const allGlobalParcels = [
  {
    created: 576424800000,
    location: 'aus',
    properties: {},
  },
  {
    created: 1558163267311,
    location: 'us',
    properties: {},
  },
  // ...2701201201 more items
];

const sortParcelsByCountry = parcels => country => {
  // 1. Filter our list to only include parcels from 'country;
  const countryParcels = parcels.filter(parcel => parcel.location === country);

  // we now return a function that sorts the parcels by date created
  return order => {
    // 2. Sort the list of packages by date
    const sortedResult = [...countryParcels].sort((a, b) => {
      if (order === 'ascending') return a.created - b.created;

      // by default return packages by descending order
      return b.created - a.created;
    });

    return sortedResult;
  };
};

// we create a new function with the filtered list of parcels by country in it's closure scope
const sortAusParcelsBy = sortParcelsByCountry(allGlobalParcels)('aus');

const ausParcelsAsc = sortAusParcelsBy('ascending');
const ausParcelsDsc = sortAusParcelsBy('descending');
