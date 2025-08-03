/**
 * 基础Entity
 */
export interface BaseEntity {
    /**
     * When The Data was Created
     */
    ctime: Date;

    /**
     * When The Data was Updated
     */
    utime: Date;

    /**
     * When The Data was Deleted
     */
    dtime?: Date;
}
