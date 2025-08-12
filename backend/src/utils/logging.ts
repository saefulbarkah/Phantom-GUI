import chalk from "chalk";

class LOG {
  static INFO(...param: any[]) {
    console.info(`${chalk.blue("[i]")} ${param.join(" ")}`);
  }
  static SUCCESS(...param: any[]) {
    console.info(`${chalk.green("[✓]")} ${param.join(" ")}`);
  }
  static ERROR(...param: any[]) {
    console.info(`${chalk.red("[✗]")} ${param.join(" ")}`);
  }
}

export default LOG;
