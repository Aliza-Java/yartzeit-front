import { Hdate } from './hdate.model';
import { Yartzeit } from './yartzeit.model';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hebrewName: string;
  fatherName: string;
  motherName: string;
  dob: Hdate;
  anniversary: Hdate;
  spouse: string;
  aliya: Hdate;
  bmParasha: string;
  relative?: Member; // optional to avoid infinite recursion on init
  yartzeits: Yartzeit[];
}