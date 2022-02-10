export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create your generators here
  plop.setGenerator("basics", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name your resource: ",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: "add",
        path: "src/model/{{snakeCase name}}.model.ts",
        templateFile: "templates/model.template.hbs",
      },
      {
        type: "add",
        path: "src/service/{{snakeCase name}}.service.ts",
        templateFile: "templates/service.template.hbs",
      },
      {
        type: "add",
        path: "src/controller/{{snakeCase name}}.controller.ts",
        templateFile: "templates/controller.template.hbs",
      },
    ], // array of actions
  });

  plop.setHelper("titleCase", (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  });

  plop.setHelper("snakeCase", (str) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");
  });
}
