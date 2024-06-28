const fs = require('fs');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

// const pageUrl = "https://in.indeed.com/m/?from=gnav-compui#";
const htmlContent = fs.readFileSync('jobs.txt', 'utf8');

const $ = cheerio.load(htmlContent);

const extractJobDetails = () => {
    const jobDetails = [];

    $('.resultContent').each((index, element) => {
        const $element = $(element);

        const jobTitle = $element.find('.jcs-JobTitle').text().trim();

        const companyName = $element.find('.css-63koeb').text().trim();

        const location = $element.find('.css-1p0sjhy').text().trim();

        const jobType = '';

        const postedDate = '';

        const jobDescription = '';

        jobDetails.push({
            jobTitle,
            companyName,
            location,
            jobType,
            postedDate,
            jobDescription
        });
    });

    return jobDetails;
};

const allJobs = extractJobDetails();


const writeToExcel = (jobs) => {

    const wb = XLSX.utils.book_new();

    const wsData = [
        ['Job Title', 'Company Name', 'Location', 'Job Type', 'Posted Date', 'Job Description']
    ];

    jobs.forEach(job => {
        wsData.push([
            job.jobTitle,
            job.companyName,
            job.location,
            job.jobType,
            job.postedDate,
            job.jobDescription
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Job Details');

    XLSX.writeFile(wb, 'job_details.xlsx');

    console.log('Excel file generated successfully.');
};


writeToExcel(allJobs);