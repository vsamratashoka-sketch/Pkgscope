export const resolver = async (dependencies) => {
  const depsKeys = Object.keys(dependencies);
  const depsVals = Object.values(dependencies);
  const depInfo = [];
  for (let i = 0; i < depsKeys.length; i++) {
    console.log(depsKeys[i], depsVals[i].replace("^", ""));

    let url = `${process.env.NPM_URL}/${depsKeys[i]}/${depsVals[i].replace("^", "")}`;
    console.log(url);

    let responses = await fetch(url);

    let dataset = await responses.json();

    const record = {
      name: dataset.name,
      version: dataset.version,
      size: dataset.dist?.unpackedSize ?? null,
      author: dataset.author ?? null,
      dependencies: dataset.dependencies ?? {},
    };
    depInfo.push(record);
  }
  return depInfo;
};
