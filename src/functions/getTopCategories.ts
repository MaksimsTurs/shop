const getTopCategories = (data: any[]) => {
  const popularProducts = data
    .filter((element) => element.rating > 4)
    .map(
      (element) =>
        `${element.category[0].toUpperCase()}${element.category.slice(
          1,
          element.category.length
        )}`
    );
  const popularCategories = popularProducts.filter(
    (element, index) => popularProducts.indexOf(element) === index
  );

  return { popularCategories };
};

export default getTopCategories;
