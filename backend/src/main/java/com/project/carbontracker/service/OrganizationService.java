package com.project.carbontracker.service;

import com.project.carbontracker.dto.EmployeeCreateRequest;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.entity.Role;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.ActivityRepository;
import com.project.carbontracker.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // ============================================================
    // ORGANIZATION DASHBOARD
    // GET /api/organization/dashboard
    // ============================================================

    public Map<String, Object> getOrganizationDashboard() {

        List<User> allUsers =
                userRepository.findAll();

        List<User> members =
                allUsers.stream()
                        .filter(user ->
                                user.getRole() == Role.USER
                        )
                        .toList();

        List<Activity> activities =
                activityRepository.findAll();

        LocalDate today =
                LocalDate.now();


        // --------------------------------------------------------
        // TODAY'S ACTIVITIES
        // --------------------------------------------------------

        List<Activity> todayActivities =
                activities.stream()
                        .filter(activity ->
                                activity.getActivityDate() != null &&
                                        activity.getActivityDate().equals(today)
                        )
                        .toList();


        // --------------------------------------------------------
        // TOTAL MEMBERS
        // --------------------------------------------------------

        long totalMembers =
                members.size();


        // --------------------------------------------------------
        // ACTIVE MEMBERS
        // --------------------------------------------------------

        long activeMembers =
                activities.stream()
                        .map(Activity::getUserId)
                        .filter(Objects::nonNull)
                        .distinct()
                        .filter(memberId ->
                                members.stream()
                                        .anyMatch(user ->
                                                user.getId() != null &&
                                                        user.getId().equals(memberId)
                                        )
                        )
                        .count();


        // --------------------------------------------------------
        // TODAY'S ACTIVITY COUNT
        // --------------------------------------------------------

        long todaysActivityCount =
                todayActivities.size();


        // --------------------------------------------------------
        // TODAY'S EMISSION
        // --------------------------------------------------------

        double todaysEmission =
                round(
                        todayActivities.stream()
                                .mapToDouble(activity ->
                                        activity.getEmission() == null
                                                ? 0.0
                                                : activity.getEmission()
                                )
                                .sum()
                );


        // --------------------------------------------------------
        // TOTAL EMISSION
        // --------------------------------------------------------

        double totalEmission =
                round(
                        activities.stream()
                                .mapToDouble(activity ->
                                        activity.getEmission() == null
                                                ? 0.0
                                                : activity.getEmission()
                                )
                                .sum()
                );


        // --------------------------------------------------------
        // CATEGORY SUMMARY
        // --------------------------------------------------------

        Map<String, Double> categorySummary =
                new LinkedHashMap<>();

        for (Activity activity : activities) {

            if (activity.getEmission() == null) {
                continue;
            }

            String category =
                    activity.getCategory();

            if (category == null ||
                    category.isBlank()) {

                category = "Other";
            }

            categorySummary.merge(
                    category,
                    activity.getEmission(),
                    Double::sum
            );
        }

        categorySummary.replaceAll(
                (key, value) -> round(value)
        );


        // --------------------------------------------------------
        // EMISSION TREND
        // --------------------------------------------------------

        Map<String, Double> emissionTrend =
                new TreeMap<>();

        for (Activity activity : activities) {

            if (activity.getActivityDate() == null ||
                    activity.getEmission() == null) {

                continue;
            }

            String date =
                    activity.getActivityDate().toString();

            emissionTrend.merge(
                    date,
                    activity.getEmission(),
                    Double::sum
            );
        }

        emissionTrend.replaceAll(
                (key, value) -> round(value)
        );


        // --------------------------------------------------------
        // RESPONSE
        // --------------------------------------------------------

        Map<String, Object> dashboard =
                new LinkedHashMap<>();

        dashboard.put(
                "totalMembers",
                totalMembers
        );

        dashboard.put(
                "activeMembers",
                activeMembers
        );

        dashboard.put(
                "todaysActivities",
                todaysActivityCount
        );

        dashboard.put(
                "todaysEmission",
                todaysEmission
        );

        dashboard.put(
                "totalEmission",
                totalEmission
        );

        dashboard.put(
                "categorySummary",
                categorySummary
        );

        dashboard.put(
                "emissionTrend",
                emissionTrend
        );

        return dashboard;
    }


    // ============================================================
    // CREATE EMPLOYEE
    // POST /api/organization/employees
    // ============================================================

    @Transactional
    public Map<String, Object> createEmployee(
            EmployeeCreateRequest request
    ) {

        if (request == null) {

            throw new IllegalArgumentException(
                    "Employee details are required"
            );
        }


        if (request.getFullName() == null ||
                request.getFullName().isBlank()) {

            throw new IllegalArgumentException(
                    "Full name is required"
            );
        }


        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            throw new IllegalArgumentException(
                    "Email is required"
            );
        }


        // --------------------------------------------------------
        // CHECK EMAIL
        // --------------------------------------------------------

        if (userRepository.existsByEmail(email)) {

            throw new IllegalArgumentException(
                    "An account with this email already exists"
            );
        }


        // --------------------------------------------------------
        // CHECK PHONE
        // --------------------------------------------------------

        String phoneNumber =
                request.getPhoneNumber();


        if (phoneNumber != null &&
                !phoneNumber.isBlank() &&
                userRepository.existsByPhoneNumber(
                        phoneNumber
                )) {

            throw new IllegalArgumentException(
                    "Phone number already exists"
            );
        }


        // --------------------------------------------------------
        // GENERATE DEFAULT PASSWORD
        // --------------------------------------------------------

        String defaultPassword =
                generateDefaultPassword();


        // --------------------------------------------------------
        // CREATE EMPLOYEE
        // --------------------------------------------------------

        User employee =
                User.builder()
                        .fullName(
                                request.getFullName()
                                        .trim()
                        )
                        .email(email)
                        .phoneNumber(phoneNumber)
                        .age(request.getAge())
                        .gender(request.getGender())
                        .password(
                                passwordEncoder.encode(
                                        defaultPassword
                                )
                        )
                        .googleId(null)
                        .authProvider("LOCAL")
                        .role(Role.USER)
                        .temporaryPassword(true)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();


        User savedEmployee =
                userRepository.save(employee);


        // --------------------------------------------------------
        // SEND DEFAULT CREDENTIALS
        // --------------------------------------------------------

        emailService.sendEmployeeCredentials(
                savedEmployee.getEmail(),
                savedEmployee.getFullName(),
                defaultPassword
        );


        // --------------------------------------------------------
        // RESPONSE
        // --------------------------------------------------------

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "Employee created successfully. Login credentials have been sent to the employee's email."
        );

        response.put(
                "employeeId",
                savedEmployee.getId()
        );

        response.put(
                "name",
                savedEmployee.getFullName()
        );

        response.put(
                "email",
                savedEmployee.getEmail()
        );

        response.put(
                "phoneNumber",
                savedEmployee.getPhoneNumber()
        );

        response.put(
                "age",
                savedEmployee.getAge()
        );

        response.put(
                "gender",
                savedEmployee.getGender()
        );

        response.put(
                "role",
                savedEmployee.getRole().name()
        );

        return response;
    }


    // ============================================================
    // GENERATE DEFAULT PASSWORD
    // ============================================================

    private String generateDefaultPassword() {

        String characters =
                "ABCDEFGHJKLMNPQRSTUVWXYZ" +
                        "abcdefghijkmnopqrstuvwxyz" +
                        "23456789";

        Random random =
                new Random();

        StringBuilder password =
                new StringBuilder();

        password.append("CT@");

        for (int i = 0; i < 8; i++) {

            int index =
                    random.nextInt(
                            characters.length()
                    );

            password.append(
                    characters.charAt(index)
            );
        }

        return password.toString();
    }


    // ============================================================
    // GET EMPLOYEES
    // GET /api/organization/employees
    // ============================================================

    public List<Map<String, Object>> getEmployees() {

        List<User> members =
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                user.getRole() == Role.USER
                        )
                        .toList();


        List<Activity> activities =
                activityRepository.findAll();


        List<Map<String, Object>> employees =
                new ArrayList<>();


        for (User user : members) {

            long activityCount =
                    activities.stream()
                            .filter(activity ->
                                    activity.getUserId() != null &&
                                            activity.getUserId()
                                                    .equals(user.getId())
                            )
                            .count();


            Map<String, Object> employee =
                    new LinkedHashMap<>();


            employee.put(
                    "id",
                    user.getId()
            );

            employee.put(
                    "fullName",
                    user.getFullName()
            );

            employee.put(
                    "email",
                    user.getEmail()
            );

            employee.put(
                    "phoneNumber",
                    user.getPhoneNumber()
            );

            employee.put(
                    "age",
                    user.getAge()
            );

            employee.put(
                    "gender",
                    user.getGender()
            );

            employee.put(
                    "department",
                    "Organization"
            );

            employee.put(
                    "role",
                    user.getRole().name()
            );

            employee.put(
                    "status",
                    activityCount > 0
                            ? "Active"
                            : "Inactive"
            );

            employee.put(
                    "activityCount",
                    activityCount
            );

            employees.add(employee);
        }


        return employees;
    }


    // ============================================================
    // GET ACTIVITIES
    // GET /api/organization/activities
    // ============================================================

    public List<Map<String, Object>> getActivities() {

        List<Activity> activities =
                activityRepository.findAll();


        List<User> users =
                userRepository.findAll();


        Map<Long, User> userMap =
                users.stream()
                        .filter(user ->
                                user.getId() != null
                        )
                        .collect(
                                Collectors.toMap(
                                        User::getId,
                                        user -> user,
                                        (a, b) -> a
                                )
                        );


        return activities.stream()
                .sorted(
                        Comparator.comparing(
                                Activity::getActivityDate,
                                Comparator.nullsLast(
                                        Comparator.reverseOrder()
                                )
                        )
                )
                .map(activity -> {

                    Map<String, Object> result =
                            new LinkedHashMap<>();


                    User user =
                            userMap.get(
                                    activity.getUserId()
                            );


                    result.put(
                            "id",
                            activity.getId()
                    );

                    result.put(
                            "userId",
                            activity.getUserId()
                    );

                    result.put(
                            "userName",
                            user != null
                                    ? user.getFullName()
                                    : "Unknown User"
                    );

                    result.put(
                            "email",
                            user != null
                                    ? user.getEmail()
                                    : ""
                    );

                    result.put(
                            "category",
                            activity.getCategory()
                    );

                    result.put(
                            "activityType",
                            activity.getActivityType()
                    );

                    result.put(
                            "quantity",
                            activity.getQuantity()
                    );

                    result.put(
                            "unit",
                            activity.getUnit()
                    );

                    result.put(
                            "emission",
                            activity.getEmission()
                    );

                    result.put(
                            "ecoPoints",
                            activity.getEcoPoints()
                    );

                    result.put(
                            "activityDate",
                            activity.getActivityDate()
                    );

                    result.put(
                            "notes",
                            activity.getNotes()
                    );


                    return result;
                })
                .toList();
    }


    // ============================================================
    // BADGES
    // GET /api/organization/badges
    // ============================================================

    public List<Map<String, Object>> getBadges() {

        List<User> members =
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                user.getRole() == Role.USER
                        )
                        .toList();


        List<Activity> activities =
                activityRepository.findAll();


        List<Map<String, Object>> badges =
                new ArrayList<>();


        for (User user : members) {

            List<Activity> userActivities =
                    activities.stream()
                            .filter(activity ->
                                    activity.getUserId() != null &&
                                            activity.getUserId()
                                                    .equals(user.getId())
                            )
                            .toList();


            int totalEcoPoints =
                    userActivities.stream()
                            .mapToInt(activity ->
                                    activity.getEcoPoints() == null
                                            ? 0
                                            : activity.getEcoPoints()
                            )
                            .sum();


            long activityCount =
                    userActivities.size();


            String badge;


            if (totalEcoPoints >= 1000) {

                badge = "Eco Champion";

            } else if (totalEcoPoints >= 500) {

                badge = "Green Hero";

            } else if (totalEcoPoints >= 250) {

                badge = "Eco Warrior";

            } else if (activityCount >= 10) {

                badge = "Active Member";

            } else if (activityCount >= 1) {

                badge = "Eco Starter";

            } else {

                badge = "No Badge";
            }


            Map<String, Object> result =
                    new LinkedHashMap<>();


            result.put(
                    "userId",
                    user.getId()
            );

            result.put(
                    "userName",
                    user.getFullName()
            );

            result.put(
                    "email",
                    user.getEmail()
            );

            result.put(
                    "activityCount",
                    activityCount
            );

            result.put(
                    "ecoPoints",
                    totalEcoPoints
            );

            result.put(
                    "badge",
                    badge
            );


            badges.add(result);
        }


        return badges;
    }


    // ============================================================
// EMISSION FACTORS
// GET /api/organization/emission-factors
// ============================================================

    public List<Map<String, Object>> getEmissionFactors() {

        List<Activity> activities =
                activityRepository.findAll();


        // ========================================================
        // GROUP ACTIVITIES BY CATEGORY
        // ========================================================

        Map<String, List<Activity>> grouped =
                activities.stream()
                        .filter(Objects::nonNull)
                        .filter(activity ->
                                activity.getCategory() != null
                        )
                        .collect(
                                Collectors.groupingBy(
                                        Activity::getCategory,
                                        LinkedHashMap::new,
                                        Collectors.toList()
                                )
                        );


        List<Map<String, Object>> factors =
                new ArrayList<>();


        // ========================================================
        // BUILD RESPONSE
        // ========================================================

        for (Map.Entry<String, List<Activity>> entry :
                grouped.entrySet()) {

            String category =
                    entry.getKey();


            List<Activity> categoryActivities =
                    entry.getValue();


            // ----------------------------------------------------
            // TOTAL QUANTITY
            // ----------------------------------------------------

            double totalQuantity =
                    categoryActivities.stream()
                            .mapToDouble(activity ->
                                    activity.getQuantity() == null
                                            ? 0.0
                                            : activity.getQuantity()
                            )
                            .sum();


            // ----------------------------------------------------
            // TOTAL EMISSION
            // ----------------------------------------------------

            double totalEmission =
                    categoryActivities.stream()
                            .mapToDouble(activity ->
                                    activity.getEmission() == null
                                            ? 0.0
                                            : activity.getEmission()
                            )
                            .sum();


            // ----------------------------------------------------
            // EMISSION FACTOR
            // ----------------------------------------------------

            double emissionFactor =
                    totalQuantity > 0
                            ? totalEmission / totalQuantity
                            : 0.0;


            // ----------------------------------------------------
            // UNIT
            // ----------------------------------------------------

            String unit =
                    categoryActivities.stream()
                            .map(Activity::getUnit)
                            .filter(Objects::nonNull)
                            .filter(value ->
                                    !value.isBlank()
                            )
                            .findFirst()
                            .orElse("-");


            // ----------------------------------------------------
            // RESPONSE OBJECT
            // ----------------------------------------------------

            Map<String, Object> result =
                    new LinkedHashMap<>();


            result.put(
                    "category",
                    category
            );


            result.put(
                    "factor",
                    round(emissionFactor)
            );


            result.put(
                    "emissionFactor",
                    round(emissionFactor)
            );


            result.put(
                    "unit",
                    unit
            );


            factors.add(result);
        }


        return factors;
    }


    // ============================================================
// ANALYTICS
// GET /api/organization/analytics
// ============================================================

    public Map<String, Object> getAnalytics() {

        // ========================================================
        // GET USERS
        // ========================================================

        List<User> users =
                userRepository.findAll();


        // ========================================================
        // GET ACTIVITIES
        // ========================================================

        List<Activity> activities =
                activityRepository.findAll();


        // ========================================================
        // TOTAL MEMBERS
        // ========================================================

        long totalMembers =
                users.stream()
                        .filter(Objects::nonNull)
                        .count();


        // ========================================================
        // TOTAL EMISSION
        // ========================================================

        double totalEmission =
                activities.stream()
                        .filter(Objects::nonNull)
                        .mapToDouble(activity ->
                                activity.getEmission() == null
                                        ? 0.0
                                        : activity.getEmission()
                        )
                        .sum();


        // ========================================================
        // TOTAL ECO POINTS
        // ========================================================

        double totalEcoPoints =
                activities.stream()
                        .filter(Objects::nonNull)
                        .mapToDouble(activity ->
                                activity.getEcoPoints() == null
                                        ? 0.0
                                        : activity.getEcoPoints()
                        )
                        .sum();


        // ========================================================
        // TOTAL ACTIVITIES
        // ========================================================

        long totalActivities =
                activities.size();


        // ========================================================
        // ACTIVE MEMBERS
        //
        // We calculate this from activities.
        // A member who has at least one activity is considered
        // active.
        // ========================================================

        long activeMembers = 0;

        try {

             activeMembers =
                    activities.stream()
                            .filter(Objects::nonNull)
                            .map(Activity::getUserId)
                            .filter(Objects::nonNull)
                            .distinct()
                            .count();

        } catch (Exception ignored) {

            /*
             * If Activity does not expose getUser(),
             * don't break the complete analytics API.
             */
            activeMembers = 0;
        }


        // ========================================================
        // AVERAGE EMISSION PER MEMBER
        // ========================================================

        double averageEmissionPerMember =
                totalMembers > 0
                        ? totalEmission / totalMembers
                        : 0.0;


        // ========================================================
        // AVERAGE EMISSION PER ACTIVITY
        // ========================================================

        double averageEmissionPerActivity =
                totalActivities > 0
                        ? totalEmission / totalActivities
                        : 0.0;


        // ========================================================
        // CATEGORY EMISSION
        // ========================================================

        Map<String, Double> categoryEmission =
                new LinkedHashMap<>();


        for (Activity activity : activities) {

            if (activity == null) {
                continue;
            }


            String category =
                    activity.getCategory();


            if (category == null ||
                    category.isBlank()) {

                category = "Other";
            }


            double emission =
                    activity.getEmission() == null
                            ? 0.0
                            : activity.getEmission();


            categoryEmission.merge(
                    category,
                    emission,
                    Double::sum
            );
        }


        categoryEmission.replaceAll(
                (key, value) -> round(value)
        );


        // ========================================================
        // MONTHLY EMISSION
        // ========================================================

        Map<String, Double> monthlyEmission =
                new LinkedHashMap<>();


        /*
         * We use createdAt because this is already used
         * by the Activity entity/service.
         *
         * The result is grouped by:
         *
         * January
         * February
         * March
         * ...
         */

        for (Activity activity : activities) {

            if (activity == null ||
                    activity.getCreatedAt() == null) {

                continue;
            }


            String month =
                    activity.getCreatedAt()
                            .getMonth()
                            .getDisplayName(
                                    TextStyle.FULL,
                                    Locale.ENGLISH
                            );


            double emission =
                    activity.getEmission() == null
                            ? 0.0
                            : activity.getEmission();


            monthlyEmission.merge(
                    month,
                    emission,
                    Double::sum
            );
        }


        monthlyEmission.replaceAll(
                (key, value) -> round(value)
        );


        // ========================================================
        // MONTHLY DATA
        //
        // This is the data used by the frontend
        // Emission Overview.
        // ========================================================

        List<Map<String, Object>> monthlyData =
                new ArrayList<>();


        String[] monthNames = {
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
        };


        for (String month : monthNames) {

            if (!monthlyEmission.containsKey(month)) {
                continue;
            }


            Map<String, Object> monthData =
                    new LinkedHashMap<>();


            monthData.put(
                    "month",
                    month
            );


            monthData.put(
                    "emission",
                    monthlyEmission.get(month)
            );


            monthlyData.add(monthData);
        }


        // ========================================================
        // EMISSION TREND BY DATE
        // ========================================================

        Map<String, Double> emissionTrend =
                new TreeMap<>();


        for (Activity activity : activities) {

            if (activity == null ||
                    activity.getCreatedAt() == null) {

                continue;
            }


            String date =
                    activity.getCreatedAt()
                            .toLocalDate()
                            .toString();


            double emission =
                    activity.getEmission() == null
                            ? 0.0
                            : activity.getEmission();


            emissionTrend.merge(
                    date,
                    emission,
                    Double::sum
            );
        }


        emissionTrend.replaceAll(
                (key, value) -> round(value)
        );


        // ========================================================
        // MONTHLY REDUCTION
        // ========================================================

        double monthlyReduction = 0.0;


        if (monthlyData.size() >= 2) {

            Map<String, Object> previous =
                    monthlyData.get(
                            monthlyData.size() - 2
                    );


            Map<String, Object> current =
                    monthlyData.get(
                            monthlyData.size() - 1
                    );


            double previousEmission =
                    ((Number) previous.get("emission"))
                            .doubleValue();


            double currentEmission =
                    ((Number) current.get("emission"))
                            .doubleValue();


            if (previousEmission > 0) {

                monthlyReduction =
                        (
                                (previousEmission - currentEmission)
                                        / previousEmission
                        ) * 100.0;
            }
        }


        monthlyReduction =
                round(monthlyReduction);


        // ========================================================
        // CARBON SCORE
        // ========================================================

        double carbonScore;


        if (totalEmission <= 0) {

            carbonScore = 100.0;

        } else {

            double emissionScore;

            if (totalMembers > 0) {

                double emissionPerMember =
                        totalEmission / totalMembers;


                emissionScore =
                        Math.max(
                                0,
                                100 -
                                        (emissionPerMember / 100.0)
                        );

            } else {

                emissionScore =
                        Math.max(
                                0,
                                100 -
                                        (totalEmission / 100.0)
                        );
            }


            double ecoPointScore =
                    Math.min(
                            100,
                            totalEcoPoints / 10.0
                    );


            carbonScore =
                    (emissionScore * 0.7) +
                            (ecoPointScore * 0.3);


            carbonScore =
                    Math.max(
                            0,
                            Math.min(
                                    100,
                                    carbonScore
                            )
                    );
        }


        carbonScore =
                round(carbonScore);


        // ========================================================
        // RESPONSE
        // ========================================================

        Map<String, Object> result =
                new LinkedHashMap<>();


        // --------------------------------------------------------
        // SUMMARY
        // --------------------------------------------------------

        result.put(
                "totalMembers",
                totalMembers
        );


        result.put(
                "activeMembers",
                activeMembers
        );


        result.put(
                "totalActivities",
                totalActivities
        );


        result.put(
                "totalEmission",
                round(totalEmission)
        );


        result.put(
                "totalEcoPoints",
                round(totalEcoPoints)
        );


        result.put(
                "averageEmissionPerMember",
                round(averageEmissionPerMember)
        );


        result.put(
                "averageEmissionPerActivity",
                round(averageEmissionPerActivity)
        );


        // --------------------------------------------------------
        // CHART DATA
        // --------------------------------------------------------

        result.put(
                "monthlyData",
                monthlyData
        );


        result.put(
                "monthlyEmission",
                monthlyEmission
        );


        result.put(
                "emissionTrend",
                emissionTrend
        );


        result.put(
                "categoryEmission",
                categoryEmission
        );


        // --------------------------------------------------------
        // SCORE / REDUCTION
        // --------------------------------------------------------

        result.put(
                "monthlyReduction",
                monthlyReduction
        );


        result.put(
                "carbonScore",
                carbonScore
        );


        return result;
    }


    // ============================================================
    // LEADERBOARD
    // GET /api/organization/leaderboard
    // ============================================================

    public List<Map<String, Object>>
    getLeaderboard() {

        List<User> members =
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                user.getRole() == Role.USER
                        )
                        .toList();


        List<Activity> activities =
                activityRepository.findAll();


        List<Map<String, Object>> leaderboard =
                new ArrayList<>();


        for (User user : members) {

            List<Activity> userActivities =
                    activities.stream()
                            .filter(activity ->
                                    activity.getUserId() != null &&
                                            activity.getUserId()
                                                    .equals(user.getId())
                            )
                            .toList();


            double totalEmission =
                    userActivities.stream()
                            .mapToDouble(activity ->
                                    activity.getEmission() == null
                                            ? 0.0
                                            : activity.getEmission()
                            )
                            .sum();


            int ecoPoints =
                    userActivities.stream()
                            .mapToInt(activity ->
                                    activity.getEcoPoints() == null
                                            ? 0
                                            : activity.getEcoPoints()
                            )
                            .sum();


            Map<String, Object> result =
                    new LinkedHashMap<>();


            result.put(
                    "userId",
                    user.getId()
            );

            result.put(
                    "name",
                    user.getFullName()
            );

            result.put(
                    "email",
                    user.getEmail()
            );

            result.put(
                    "activities",
                    userActivities.size()
            );

            result.put(
                    "ecoPoints",
                    ecoPoints
            );

            result.put(
                    "totalEmission",
                    round(totalEmission)
            );


            leaderboard.add(result);
        }


        // Highest eco points first

        leaderboard.sort(
                Comparator.comparing(
                        (Map<String, Object> item) ->
                                (Integer) item.get(
                                        "ecoPoints"
                                )
                ).reversed()
        );


        // Add rank

        for (int i = 0;
             i < leaderboard.size();
             i++) {

            leaderboard.get(i).put(
                    "rank",
                    i + 1
            );
        }


        return leaderboard;
    }


    // ============================================================
    // HELPER - NORMALIZE EMAIL
    // ============================================================

    private String normalizeEmail(
            String email
    ) {

        if (email == null) {
            return null;
        }

        return email
                .trim()
                .toLowerCase();
    }


    // ============================================================
    // HELPER - ROUND
    // ============================================================

    private double round(
            double value
    ) {

        return Math.round(
                value * 100.0
        ) / 100.0;
    }
}