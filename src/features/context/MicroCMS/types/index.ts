/**
 * microCMSのAPIスキーマ（自分で作成する物）
 *********************************************/
export * from './plans'
export * from './terminals'
export * from './accessories'
export * from './guarantees'
export * from './options'
export * from './others'
export * from './prices'
export * from './products'

/**
 * microCMSのAPIスキーマまとめ
 */
import { microCMSPlansType } from './plans'
import { microCMSTerminalsType } from './terminals'
import { microCMSAccessoriesType } from './accessories'
import { microCMSGuaranteesType } from './guarantees'
import { microCMSOptionsType } from './options'
import { microCMSOthersType } from './others'
export type microCMSApiSchema = microCMSPlansType | microCMSTerminalsType | microCMSAccessoriesType | microCMSGuaranteesType | microCMSOptionsType | microCMSOthersType
