import { AdmissionCriteria } from './admission-criteria.model';
import { AttendanceType } from './attendance-type.model';
import { ReferenceWay } from './reference-way.model';
import { Regional } from './regional.model';
import { Segment } from './segment.model';
import { ServiceType } from './service-type.model';

export interface Place {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  website: string;
  observations: string;
  google_maps_link: string;
  google_maps_embed_link: string;
  service_type: ServiceType;
  segment: Segment;
  regionals: Array<Regional>;
  reference_ways: Array<ReferenceWay>;
  admission_criteria: Array<AdmissionCriteria>;
  attendance_types: Array<AttendanceType>;
}

export interface PlaceList {
  metadata: { pages: number; total_places: number };
  places: Array<Place>;
}
