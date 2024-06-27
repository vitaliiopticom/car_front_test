// fake data for the product list

export const data: any[] = [];

for (let i = 1; i <= 14; i++) {
  data.push({
    id: i,
    status: i % 2 === 0 ? 'sold' : 'available',
    clon: i % 2 === 0,
    vin: `KMHJG35FP4U12345${i}`,
    brand: `Brand ${i}`,
    model: `Model ${i}`,
    finition: `Finition ${i}`,
    color: `Color ${i}`,
    km: `${i}0000`,
    ref: `000${i}`,
    price: `${i}0000`,
    dateAvailable: `2021-10-0${i}`,
    localization: `Location ${i}`,
    dateMatriculation: `2021-10-0${i}`,
    images: i,
  });
}
