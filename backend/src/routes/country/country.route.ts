import axios from 'axios';
import { ItemNotFoundException } from '@/exceptions';
import { FIXER_ACCESS_TOKEN, FIXER_URL, URL } from '@/cerendentials';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';

export class CountryRoute {
  public static path = '/countries';
  private static instance: CountryRoute;
  private router = Router();

  private constructor() {
    logger.info('[Country] Creating country route.');
    this.router.get('', this.getCountries);
    this.router.get('/:name', this.getCountryName);
  }

  static get router() {
    if (!CountryRoute.instance) {
      CountryRoute.instance = new CountryRoute();
    }
    return CountryRoute.instance.router;
  }

  private getCountryName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params && req.params.name) {
        const response = await axios.get(`${URL}name/${req.params.name}`);
        const countryRates = new Array<string>();
        countryRates.push('SEK');
        response.data.forEach(item => item.currencies.forEach(i => countryRates.push(i.code)));
        const currencies = await this.getCurrencyRates(req, res, countryRates);
        // covert to local currency exchange rate.
        response.data.forEach(item => {
          item.currencies.forEach(cur => {
            cur.rate = (1 / currencies.rates['SEK']) * currencies.rates[cur.code];
            return cur;
          });
          return item;
        });
        return res.send({ count: response.data.length, countries: response.data });
      } else {
        const data = new ItemNotFoundException(req.params.name ? req.params.name : 'Item');
        res.status(404).send({ message: data.message || 'The requested item not found', status: 400 });
      }
    } catch (error) {
      const data = new ItemNotFoundException('Not Found');
      res.status(404).send({ message: data.message, status: error.status });
    }
    next();
  };

  private getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axios.get(`${URL}all`);
      return res.send({ count: response.data.length, countries: response.data });
    } catch (error) {
      res.status(404).send({ message: error.message, status: error.status });
    }
    next();
  };

  private getCurrencyRates = async (req: Request, res: Response, symbols: string[]) => {
    try {
      const response = await axios.get(`${FIXER_URL}?access_key=${FIXER_ACCESS_TOKEN}&symbols=${symbols.toString()}`);
      return response.data;
    } catch (error) {
      res.status(error.status).send({ message: error.message, status: error.status });
    }
  };
}
