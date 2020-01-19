#!/bin/bash
string=$(aws logs describe-log-groups --query 'logGroups[?starts_with(logGroupName, `/aws/lambda`)].logGroupName' --output text)
my_array=($string)


echo  "---------------------------------------"
echo "|log-group, GB_sec, time(ms), invocations|"
echo  "---------------------------------------"

for i in "${my_array[@]}"
do
    variable=$(aws logs start-query --log-group-name "$i" --start-time $1 --end-time $2 --query-string 'parse @message "START RequestId" as @invocations | stats sum(@memorySize/1024/1024/1024 * @billedDuration/1000) as GB_sec, sum(@billedDuration) as time, count(@invocations) as invocations' --output text)
    printf "$i"
    while [[ "${results}" != *"Complete"* ]]
    do
    results=$(aws logs get-query-results --query-id $variable  --output text)
    done
    results=$(aws logs get-query-results --query-id $variable --query "results[].merge({separator: ',', value: value}).*[]"  --output text)
    echo $results
done

echo  "---------------------------"
echo "|log-group, number of errors|"
echo  "---------------------------"

for i in "${my_array[@]}"
do
    variable=$(aws logs start-query --log-group-name "$i" --start-time $1 --end-time $2 --query-string 'filter @message like /(?i)(Exception|error|fail)/ | stats count(*) as failedInvocations' --output text)
    printf "$i"
    results=$(aws logs get-query-results --query-id $variable  --output json)
    while [[ "${results}" != *"Complete"* ]]
    do
    results=$(aws logs get-query-results --query-id $variable  --output text)
    done
    results=$(aws logs get-query-results --query-id $variable --query "results[].merge({separator: ',', value: value}).*[]"  --output text)
    echo $results
done