export enum QualityIssue {
  QualityGood = 'quality_good',
  SunReflections = 'sun_reflections',
  Angle = 'angle',
  Blurred = 'blurred',
  PlatePositioning = 'plate_positioning',
  PositioningPlatform360 = 'positioning_platform_360',
  ImageNotProcessed = 'image_not_processed',
  Segmentation = 'segmentation',
  ExteriorLight = 'exterior_light',
  EmbarrassingObject = 'embarrassing_object',
  Mode3In1 = 'mode_3_in_1',
  WrongPosition = 'wrong_position',
  SunReflexion = 'sun_reflexion',
  PhotographersReflection = 'photographers_reflection',
  WrongAngle = 'wrong_angle',
  ImageTooDark = 'image_too_dark',
  IncorrectProtocolCi = 'incorrect_protocol_ci',
  TextInputSpecificProblem = 'text_input_specific_problem',
}

export enum QualityCheckStatus {
  InProgress = 'IN_PROGRESS',
  Checked = 'CHECKED',
  CheckedWithError = 'CHECKED_WITH_ERRORS',
  Unchecked = 'UNCHECKED',
}
