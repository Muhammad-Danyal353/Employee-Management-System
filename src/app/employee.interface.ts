export interface IEmployee {
  roleId: number;
  userName: string;
  empCode: string;
  empId: 0;
  empName: string;
  empEmailId: string;
  empDesignationId: 0;
  empContactNo: string;
  empAltContactNo: string;
  empPersonalEmailId: string;
  empExpTotalYear: 0;
  empExpTotalMonth: 0;
  empCity: string;
  empState: string;
  empPinCode: string;
  empAddress: string;
  empPerCity: string;
  empPerState: string;
  empPerPinCode: string;
  empPerAddress: string;
  password: string;
  ErpEmployeeSkills: [
    {
      empSkillId: 0;
      empId: 0;
      skill: string;
      totalYearExp: 0;
      lastVersionUsed: string;
    }
  ];
  ErmEmpExperiences: [
    {
      empExpId: 0;
      empId: 0;
      companyName: string;
      startDate: Date;
      endDate: Date;
      designation: string;
      projectsWorkedOn: string;
    }
  ];
}
