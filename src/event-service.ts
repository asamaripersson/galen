export const GetEventInDateRange = (from:Date, to:Date):Event[] => {
    //galenApi/eventByDates?from=from&to=to
    return [
        {
            "title": "sätt sallad",
            "description":"", 
            "tags":["JAS","Odling"], 
            "startDate": new Date(2020, 7, 10),
            "endDate": new Date(2020, 7, 10)
        },
        {
            "title": "plantera lök",
            "description":"gul, vit å röd i ", 
            "tags":["JAS","Odling"], 
            "startDate": new Date(2020, 6, 22),
            "endDate": new Date(2020, 6, 28)
        }
    ];
};

export interface Event{
    title:string;
    description?:string;
    tags:string[];
    startDate:Date;
    endDate:Date;
}