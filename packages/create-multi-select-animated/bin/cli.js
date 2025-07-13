#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const { execSync } = require("child_process");
const { Command } = require("commander");
const chalk = require("chalk");

const program = new Command();
program
  .name("create-multiselect-animated")
  .description(
    "Install the MultiSelectAnimated component in your React/Next.js project"
  )
  .option("-p, --path <dir>", "project path", ".")
  .parse(process.argv);

const opts = program.opts();
const projectDir = path.resolve(process.cwd(), opts.path);
const templateDir = path.resolve(__dirname, "../template");

console.log(chalk.cyan("📂  Copying component files..."));
fs.copySync(templateDir, projectDir, { overwrite: false, errorOnExist: false });
console.log(chalk.green("✔  Files copied"));

const hasYarn = fs.existsSync(path.join(projectDir, "yarn.lock"));
const hasPnpm = fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"));
let pm = "npm";
if (hasPnpm) pm = "pnpm";
else if (hasYarn) pm = "yarn";

const deps = [
  "@radix-ui/react-popover",
  "@radix-ui/react-separator",
  "@radix-ui/react-slot",
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "motion",
  "tailwind-merge",
];

console.log(chalk.cyan(`📦  Installing dependencies using ${pm}...`));
try {
  if (pm === "npm") {
    execSync(`npm install ${deps.join(" ")}`, {
      cwd: projectDir,
      stdio: "inherit",
    });
  } else if (pm === "yarn") {
    execSync(`yarn add ${deps.join(" ")}`, {
      cwd: projectDir,
      stdio: "inherit",
    });
  } else {
    execSync(`pnpm add ${deps.join(" ")}`, {
      cwd: projectDir,
      stdio: "inherit",
    });
  }
} catch (err) {
  console.error(chalk.red("Error installing dependencies."));
  process.exit(1);
}

console.log(
  chalk.bold.green("\n✅  MultiSelectAnimated installed successfully!")
);
