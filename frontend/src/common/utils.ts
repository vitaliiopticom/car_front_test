import { FILES_EVIDENCE_STATE } from './constants';
import { FileEvidenceState, VehicleVideo } from './types';

export const getVideosDowloadUris = (videos: VehicleVideo[]): string[] =>
  videos.map(({ video }) => video?.uri || '').filter((item) => !!item);

export const getFilesEvidenceState = (
  imagesCount: number,
  videosCount: number,
): FileEvidenceState => {
  if (!videosCount) {
    return FILES_EVIDENCE_STATE.onlyPhotos;
  }
  if (!imagesCount) {
    return FILES_EVIDENCE_STATE.onlyVideos;
  }

  return FILES_EVIDENCE_STATE.all;
};
