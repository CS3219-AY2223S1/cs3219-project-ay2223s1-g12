import { createRecord, findRecord } from "./repository.js";


export async function ormStoreRecord(username, newQuestion) {
    try {
        // if no records exist for this user -> create new model
        const userRecord = await findRecord(username);

        if (!userRecord) {
            const newRecord = await createRecord({username, records: [newQuestion]});
            newRecord.save();
            return { status: 'created' };
        } else {
            // otherwise update existing records
            if (!userRecord.records.some(r => r.questionTitle === newQuestion.questionTitle && r.questionDifficulty === newQuestion.questionDifficulty)) {
                userRecord.records.push(newQuestion);
                userRecord.save();
            } else {
                console.log('Question Title already exists!');
            }

            return { status: 'updated'};
        }
    } catch (err) {
        console.log('ERROR: Could not save record');
        return { err };
    }
}


export async function ormGetRecords(username) {
    try {
        const userRecord = await findRecord(username);
        
        return userRecord;
    } catch (err) {
        console.log('ERROR: Could not get record');
        return { err };
    }
}