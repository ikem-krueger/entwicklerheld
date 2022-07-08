<?php
declare(strict_types=1);
include("user_data.php");

function from_char_n(string $field, int $n): string {
    return from_char_m_to_last_n_chars($field, $n, 0);
}

function to_last_n_chars(string $field, int $n): string {
    return from_char_m_to_last_n_chars($field, 0, $n);
}

function from_char_m_to_last_n_chars(string $field, int $m, int $n) {
    $length = strlen($field);

    return substr($field, 0, $m) . str_repeat("*", $length - ($m + $n)) . substr($field, $length - $n, $length);
}

function from_start_to_at_sign($email) {
    $email = explode("@", $email);
    
    $name = $email[0];
    $domain = $email[1];

    return str_repeat("*", strlen($name)) . '@' . $domain;
}

function get_personal_data(string $user_id): array {
    $data = get_user_by_id($user_id);

    if(has_strong_authetication($user_id)) {
        return $data;
    }

    $data["street"] = from_char_n($data["street"], 3);
    $data["zip"] = from_char_n($data["zip"], 3);
    $data["city"] = to_last_n_chars($data["city"], 3);
    $data["email"] = from_start_to_at_sign($data["email"]);
    $data["phone"] = to_last_n_chars($data["phone"], 3);
    $data["bank account"] = from_char_m_to_last_n_chars($data["bank account"], 2, 3);

    // reference account
    $data["reference account"]["iban"] = from_char_m_to_last_n_chars($data["reference account"]["iban"], 3, 3);
    $data["reference account"]["bic"] = to_last_n_chars($data["reference account"]["bic"], 3);
    $data["reference account"]["institution"] = from_char_m_to_last_n_chars($data["reference account"]["institution"], 3, 3);

    return $data;
}
?>