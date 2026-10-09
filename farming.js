class FarmingSystem {
    constructor() {
        this.fields = [
            { id: 1, state: 'plowed', crop: 'wheat', stage: 0 }
        ];
    }

    cultivate(fieldId) {
        const field = this.fields.find(f => f.id === fieldId);
        if (field) field.state = 'cultivated';
    }

    sow(fieldId, cropType) {
        const field = this.fields.find(f => f.id === fieldId);
        if (field && field.state === 'cultivated') {
            field.state = 'sowed';
            field.crop = cropType;
            field.stage = 1;
        }
    }
}
