import AL from '@amcharts/amcharts4-geodata/region/usa/alLow';
import AK from '@amcharts/amcharts4-geodata/region/usa/akLow';
import AZ from '@amcharts/amcharts4-geodata/region/usa/azLow';
import AR from '@amcharts/amcharts4-geodata/region/usa/arLow';
import CA from '@amcharts/amcharts4-geodata/region/usa/caLow';
import CO from '@amcharts/amcharts4-geodata/region/usa/coLow';
import CT from '@amcharts/amcharts4-geodata/region/usa/ctLow';
import DE from '@amcharts/amcharts4-geodata/region/usa/deLow';
import FL from '@amcharts/amcharts4-geodata/region/usa/flLow';
import GA from '@amcharts/amcharts4-geodata/region/usa/gaLow';
import HI from '@amcharts/amcharts4-geodata/region/usa/hiLow';
import ID from '@amcharts/amcharts4-geodata/region/usa/idLow';
import IL from '@amcharts/amcharts4-geodata/region/usa/ilLow';
import IN from '@amcharts/amcharts4-geodata/region/usa/inLow';
import IA from '@amcharts/amcharts4-geodata/region/usa/iaLow';
import KS from '@amcharts/amcharts4-geodata/region/usa/ksLow';
import KY from '@amcharts/amcharts4-geodata/region/usa/kyLow';
import LA from '@amcharts/amcharts4-geodata/region/usa/laLow';
import ME from '@amcharts/amcharts4-geodata/region/usa/meLow';
import MD from '@amcharts/amcharts4-geodata/region/usa/mdLow';
import MA from '@amcharts/amcharts4-geodata/region/usa/maLow';
import MI from '@amcharts/amcharts4-geodata/region/usa/miLow';
import MN from '@amcharts/amcharts4-geodata/region/usa/mnLow';
import MS from '@amcharts/amcharts4-geodata/region/usa/msLow';
import MO from '@amcharts/amcharts4-geodata/region/usa/moLow';
import MT from '@amcharts/amcharts4-geodata/region/usa/mtLow';
import NE from '@amcharts/amcharts4-geodata/region/usa/neLow';
import NV from '@amcharts/amcharts4-geodata/region/usa/nvLow';
import NH from '@amcharts/amcharts4-geodata/region/usa/nhLow';
import NJ from '@amcharts/amcharts4-geodata/region/usa/njLow';
import NM from '@amcharts/amcharts4-geodata/region/usa/nmLow';
import NY from '@amcharts/amcharts4-geodata/region/usa/nyLow';
import NC from '@amcharts/amcharts4-geodata/region/usa/ncLow';
import ND from '@amcharts/amcharts4-geodata/region/usa/ndLow';
import OH from '@amcharts/amcharts4-geodata/region/usa/ohLow';
import OK from '@amcharts/amcharts4-geodata/region/usa/okLow';
import OR from '@amcharts/amcharts4-geodata/region/usa/orLow';
import PA from '@amcharts/amcharts4-geodata/region/usa/paLow';
import RI from '@amcharts/amcharts4-geodata/region/usa/riLow';
import SC from '@amcharts/amcharts4-geodata/region/usa/scLow';
import SD from '@amcharts/amcharts4-geodata/region/usa/sdLow';
import TN from '@amcharts/amcharts4-geodata/region/usa/tnLow';
import TX from '@amcharts/amcharts4-geodata/region/usa/txLow';
import UT from '@amcharts/amcharts4-geodata/region/usa/utLow';
import VT from '@amcharts/amcharts4-geodata/region/usa/vtLow';
import VA from '@amcharts/amcharts4-geodata/region/usa/vaLow';
import WA from '@amcharts/amcharts4-geodata/region/usa/waLow';
import WV from '@amcharts/amcharts4-geodata/region/usa/wvLow';
import WI from '@amcharts/amcharts4-geodata/region/usa/wiLow';
import WY from '@amcharts/amcharts4-geodata/region/usa/wyLow';

const stateMapData = {
  Alabama: AL,
  Alaska: AK,
  Arizona: AZ,
  Arkansas: AR,
  California: CA,
  Colorado: CO,
  Connecticut: CT,
  Delaware: DE,
  Florida: FL,
  Georgia: GA,
  Hawaii: HI,
  Idaho: ID,
  Illinois: IL,
  Indiana: IN,
  Iowa: IA,
  Kansas: KS,
  Kentucky: KY,
  Louisiana: LA,
  Maine: ME,
  Maryland: MD,
  Massachusetts: MA,
  Michigan: MI,
  Minnesota: MN,
  Mississippi: MS,
  Missouri: MO,
  Montana: MT,
  Nebraska: NE,
  Nevada: NV,
  'New Hampshire': NH,
  'New Jersey': NJ,
  'New Mexico': NM,
  'New York': NY,
  'North Carolina': NC,
  'North Dakota': ND,
  Ohio: OH,
  Oklahoma: OK,
  Oregon: OR,
  Pennsylvania: PA,
  'Rhode Island': RI,
  'South Carolina': SC,
  'South Dakota': SD,
  Tennessee: TN,
  Texas: TX,
  Utah: UT,
  Vermont: VT,
  Virginia: VA,
  Washington: WA,
  'West Virginia': WV,
  Wisconsin: WI,
  Wyoming: WY,
};

export default (stateName) => {
  return stateMapData[stateName];
};
