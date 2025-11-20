#[cfg(windows)]
use std::path::Path;
use std::process::Command;

#[tauri::command]
pub fn run_detached(program: String, args: Vec<String>) -> Result<(), String> {
    let exe_dir = Path::new(&program)
        .parent()
        .ok_or("Failed to get exe dir")?;

    // Escape args only if not empty
    let arg_list = if args.is_empty() {
        None
    } else {
        Some(args.join(" "))
    };

    // Build PowerShell command dynamically
    let ps_command = if let Some(arglist) = arg_list {
        format!(
            "Start-Process -FilePath \"{}\" -ArgumentList \"{}\" -WorkingDirectory \"{}\"",
            program,
            arglist,
            exe_dir.display()
        )
    } else {
        format!(
            "Start-Process -FilePath \"{}\" -WorkingDirectory \"{}\"",
            program,
            exe_dir.display()
        )
    };

    #[cfg(windows)]
    {
        std::process::Command::new("powershell")
            .args(["-Command", &ps_command])
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    #[cfg(not(windows))]
    {
        std::process::Command::new(&program)
            .args(&args)
            .current_dir(exe_dir)
            .spawn()
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[tauri::command]
pub fn is_process_running(process_name: String) -> bool {
    #[cfg(windows)]
    {
        if let Ok(output) = Command::new("tasklist").output() {
            let stdout = String::from_utf8_lossy(&output.stdout).to_lowercase();
            stdout.contains(&process_name.to_lowercase())
        } else {
            false
        }
    }

    #[cfg(not(windows))]
    {
        if let Ok(output) = std::process::Command::new("ps").arg("aux").output() {
            let stdout = String::from_utf8_lossy(&output.stdout).to_lowercase();
            stdout.contains(&process_name.to_lowercase())
        } else {
            false
        }
    }
}
