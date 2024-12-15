import { AttendanceType } from './attendance-type.model';
import { ReferenceWay } from './reference-way.model';
import { Regional } from './regional.model';
import { Segment } from './segment.model';
import { ServiceType } from './service-type.model';

export class Place {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  website: string;
  observations: string;
  google_maps_link: string;
  google_maps_embed_link: string;
  admission_criteria: string;
  service_type: ServiceType;
  segment: Segment;
  regionals: Array<Regional>;
  reference_ways: Array<ReferenceWay>;
  attendance_types: Array<AttendanceType>;

  constructor(
    id: number,
    name: string,
    address: string,
    phone_number: string,
    website: string,
    observations: string,
    google_maps_link: string,
    google_maps_embed_link: string,
    admission_criteria: string,
    service_type: ServiceType,
    segment: Segment,
    regionals: Array<Regional>,
    reference_ways: Array<ReferenceWay>,
    attendance_types: Array<AttendanceType>
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.website = website;
    this.observations = observations;
    this.google_maps_link = google_maps_link;
    this.google_maps_embed_link = google_maps_embed_link;
    this.admission_criteria = admission_criteria;
    this.service_type = service_type;
    this.segment = segment;
    this.regionals = regionals;
    this.reference_ways = reference_ways;
    this.attendance_types = attendance_types;
  }
}

export interface PlaceList {
  metadata: { pages: number; total_places: number };
  places: Array<Place>;
}
