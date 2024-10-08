package com.llamrei.domain

class Asset {
    String assetUniqueID
    String assetName
    String clientName
    String description
    String location
    String imageurl
    Date creationDate
    Date modificationDate
    String connectivityStatus
    String currentState
    /**
     * Relationship mapping
     */

    static hasMany= [timeSeries: TimeSeries, dataSeries: DataPoint,alerts:Alerts]
    
    /**
     * Putting constraints with properties
     */
    static constraints = {
        assetUniqueID(nullable: true, unique: true)
        assetName(nullable: false)
        connectivityStatus(nullable: true)
        description(nullable: true)
        location(nullable: false)
        imageurl(nullable:true)
        clientName  (nullable: false)
        creationDate(nullable: true)
        modificationDate(nullable: true)
        timeSeries(nullable: true)
        currentState(nullable:true)
       // alerts(nullable: true)
    }
    
    /**
     * Mapping to define column names for domain objects in the database
     */
    static mapping = {
        assetUniqueID column:"assetUniqueID"
        assetName column:"assetName"
        creationDate column: "creationDate"
        modificationDate column:"modificationDate"
        timeSeries cascade: 'none'
        alerts cascade: 'all'
        dataSeries cascade: 'all'
        alerts(sort:'created',order:'desc')

    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", assetUniqueID='" + assetUniqueID + '\'' +
                ", assetName='" + assetName + '\'' +
                ", clientName='" + clientName + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +

                ", creationDate=" + creationDate +
                ", modificationDate=" + modificationDate +
                ", version=" + version +
                '}';
    }
}
