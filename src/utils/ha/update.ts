import {
    HassEntity,
    HassEntityAttributeBase,
    HassEntityBase
} from 'home-assistant-js-websocket';

export const UPDATE_SUPPORT_INSTALL = 1;
export const UPDATE_SUPPORT_SPECIFIC_VERSION = 2;
export const UPDATE_SUPPORT_PROGRESS = 4;
export const UPDATE_SUPPORT_BACKUP = 8;
export const UPDATE_SUPPORT_RELEASE_NOTES = 16;

interface UpdateEntityAttributes extends HassEntityAttributeBase {
  auto_update: boolean | null;
  installed_version: string | null;
  in_progress: boolean | number;
  latest_version: string | null;
  release_summary: string | null;
  release_url: string | null;
  skipped_version: string | null;
  title: string | null;
}

export interface UpdateEntity extends HassEntityBase {
  attributes: UpdateEntityAttributes;
}

export const supportsFeature = (stateObj: HassEntity, feature: number): boolean =>
  ((stateObj.attributes.supported_features ?? 0) & feature) !== 0;

export const updateUsesProgress = (entity: UpdateEntity): boolean =>
  supportsFeature(entity, UPDATE_SUPPORT_PROGRESS) &&
  typeof entity.attributes.in_progress === 'number';

export const updateIsInstalling = (entity: UpdateEntity): boolean =>
  updateUsesProgress(entity) || !!entity.attributes.in_progress;
