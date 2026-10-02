// One place that lists every brand. Add a new brand: create its file, import it here, add a theme in themes.css.
import { aurelle } from './aurelle';
import { gemmaGrove } from './gemma-grove';
import { lustre } from './lustre';

export const BRANDS = { aurelle, 'gemma-grove': gemmaGrove, lustre };

// Metal options shared by every brand.
export const METALS = ['14K Yellow Gold', '14K White Gold', '14K Rose Gold'];
export const METAL_HEX = {
  '14K Yellow Gold': '#d9b56a',
  '14K White Gold': '#dfe3e8',
  '14K Rose Gold': '#e3a897',
};
